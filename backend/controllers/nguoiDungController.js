import nguoiDungModel from '../models/nguoiDungModel.js';
import bcrypt from 'bcrypt'
import validator from 'validator';
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const nguoiDungDangNhap = async (req, res) => {
    try {
        const { email, matKhau } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const nguoiDung = await nguoiDungModel.findOne({ email });
        if (!nguoiDung) {
            return res.json({ success: false, message: "Người dùng không tồn tại" });
        }

        // So sánh mật khẩu được cung cấp với mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(matKhau, nguoiDung.matKhau);
        if (isMatch) {
            const token = createToken(nguoiDung._id); // Tạo token cho người dùng
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// route for user register
const nguoiDungDangKy = async (req, res) => {
    try {
        const { ten, email, matKhau } = req.body;
        // checking already  exists or not
        const exists = await nguoiDungModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Người dùng đã tồn tại" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Hãy nhập đúng định dạng email" })

        }
        if (matKhau.length < 8) {
            return res.json({ success: false, message: "Mật khẩu tối thiểu 8 ký tự" })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(matKhau, salt)
        const newUser = new nguoiDungModel({
            ten,
            email,
            matKhau: hashedPassword
        })

        const nguoiDung = await newUser.save()
        const token = createToken(nguoiDung._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// route for admin login
const quanLyDangNhap = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Tài khoản đăng nhập không hợp lệ" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { nguoiDungDangNhap, nguoiDungDangKy, quanLyDangNhap };