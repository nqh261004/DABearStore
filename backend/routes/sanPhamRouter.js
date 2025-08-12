import express from 'express';
import { listSanPham, themSanPham, xoaSanPham, sanPham, updateSanPham } from '../controllers/sanPhamControllers.js';
import upload from '../middleware/multer.js';
import quanLyAuth from '../middleware/quanLyAuth.js';

const sanPhamRouter = express.Router();

// Route để thêm sản phẩm
sanPhamRouter.post('/them', quanLyAuth, upload.single('image'), (req, res, next) => {
    console.log('Request body:', req.body); // Kiểm tra dữ liệu body
    console.log('Request file:', req.file); // Kiểm tra file hình ảnh
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Vui lòng upload hình ảnh" });
    }
    next();
}, themSanPham);


// Route để xóa sản phẩm
sanPhamRouter.post('/xoa', quanLyAuth, xoaSanPham);

// Route để lấy sản phẩm cụ thể
sanPhamRouter.post('/don', sanPham);

// Route để lấy danh sách sản phẩm
sanPhamRouter.get('/list', listSanPham);

  sanPhamRouter.put('/sua', upload.single('image'), quanLyAuth, updateSanPham);
export default sanPhamRouter;
