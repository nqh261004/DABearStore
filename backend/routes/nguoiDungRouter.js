import express from 'express';
import { nguoiDungDangNhap, nguoiDungDangKy, quanLyDangNhap } from '../controllers/nguoiDungController.js';

const nguoiDungRouter = express.Router();

nguoiDungRouter.post('/dangKy', nguoiDungDangKy);
nguoiDungRouter.post('/dangNhap', nguoiDungDangNhap);
nguoiDungRouter.post('/admin', quanLyDangNhap);

export default nguoiDungRouter;