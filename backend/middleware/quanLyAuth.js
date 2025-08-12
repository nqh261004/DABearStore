import Jwt from 'jsonwebtoken'
const quanLyAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Tài khoản không đủ quyền truy cập" })
        }
        const token_decode = Jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Tài khoản không đủ quyền truy cập" })
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default quanLyAuth