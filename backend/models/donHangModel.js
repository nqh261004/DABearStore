import mongoose from 'mongoose'

const donHangSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    sanPham: { type: Array, require: true },
    tongTien: { type: Number, require: true },
    diaChi: { type: Object, require: true },
    trangThai: { type: String, require: true, default: 'Xác Nhận Đơn Hàng' },
    phuongThuc: { type: String, require: true },
    thanhToan: { type: Boolean, require: true, default: false },
    date: { type: Number, require: true }


})

const donHangModel = mongoose.models.donHang || mongoose.model('donHang', donHangSchema)
export default donHangModel;