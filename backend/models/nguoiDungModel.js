import mongoose from "mongoose";

const nguoiDungSchema = new mongoose.Schema({
    ten: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matKhau: { type: String, required: true },
    gioHang: { type: Object, default: {} }


}, { minimize: false });

const nguoiDungModel = mongoose.models.nguoiDung || mongoose.model('nguoiDung', nguoiDungSchema);

export default nguoiDungModel