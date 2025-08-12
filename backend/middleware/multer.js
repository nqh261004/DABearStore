import fs from 'fs';
import multer from 'multer';

// Kiểm tra và tạo thư mục 'uploads' nếu chưa tồn tại
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Cấu hình multer để chỉ xử lý một file hình ảnh
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/'); // Thư mục lưu file
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Lưu file với tên gốc
    }
});

const upload = multer({ storage });

export default upload;
