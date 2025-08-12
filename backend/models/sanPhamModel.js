import mongoose from "mongoose";
const sanPhamSchema = new mongoose.Schema({
    ten: { type: String, required: true },
    moTa1: { type: String, required: true },
    moTa2: { type: String, required: true },
    gia: { type: Number, required: true },
    image: { type: Array, required: true },
    phanLoai: { type: String, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
})

const sanPhamModel = mongoose.models.sanPham || mongoose.model("sanPham", sanPhamSchema);

export default sanPhamModel