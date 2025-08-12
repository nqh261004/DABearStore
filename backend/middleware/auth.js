import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Tài Khoản Không Đủ Quyền Truy Cập' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);  // Sử dụng jwt.verify thay vì Jwt.verify
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;