import nguoiDungModel from "../models/nguoiDungModel.js";

const themGioHang = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await nguoiDungModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        let cartData = userData.gioHang;

        if (cartData[itemId]) {
            cartData[itemId].soLuong += 1; // Tăng số lượng sản phẩm
        } else {
            cartData[itemId] = { soLuong: 1 }; // Thêm mới sản phẩm với số lượng ban đầu là 1
        }

        await nguoiDungModel.findByIdAndUpdate(userId, { gioHang: cartData });
        res.json({ success: true, message: "Đã thêm vào giỏ hàng" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const capNhatGioHang = async (req, res) => {
    try {
        const { userId, itemId, soLuong } = req.body;
        const userData = await nguoiDungModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        let cartData = userData.gioHang;

        if (cartData[itemId]) {
            cartData[itemId].soLuong = soLuong; // Cập nhật số lượng sản phẩm
            await nguoiDungModel.findByIdAndUpdate(userId, { gioHang: cartData });
            res.json({ success: true, message: "Đã cập nhật giỏ hàng" });
        } else {
            res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const layGioHang = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await nguoiDungModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        res.json({ success: true, cartData: userData.gioHang });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { themGioHang, capNhatGioHang, layGioHang }