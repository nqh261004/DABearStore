import donHangModel from "../models/donHangModel.js";
import nguoiDungModel from "../models/nguoiDungModel.js";

const datHang = async (req, res) => {
    try {
        const { userId, sanPham, tongTien, diaChi } = req.body;
        const orderData = {
            userId,
            sanPham,
            diaChi,
            tongTien,
            phuongThuc: "COD",
            thanhToan: false,
            date: Date.now()
        }

        const newOrder = new donHangModel(orderData)
        await newOrder.save()

        await nguoiDungModel.findByIdAndUpdate(userId, { gioHang: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const donHangAdmin = async (req, res) => {
    try {
        const orders = await donHangModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const donHangNguoiDung = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await donHangModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateTrangThai = async (req, res) => {
    try {
        const { orderId, trangThai } = req.body
        await donHangModel.findByIdAndUpdate(orderId, { trangThai })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { datHang, donHangAdmin, donHangNguoiDung, updateTrangThai }