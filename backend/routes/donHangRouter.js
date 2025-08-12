import express from 'express'
import { datHang, donHangAdmin, donHangNguoiDung, updateTrangThai } from '../controllers/donHangController.js'
import quanLyAuth from '../middleware/quanLyAuth.js'
import nguoiDungAuth from '../middleware/auth.js'

const donHangRouter = express.Router()

//admin features
donHangRouter.post('/list', quanLyAuth,donHangAdmin )

donHangRouter.post('/trangThai', quanLyAuth, updateTrangThai)

//payment features
donHangRouter.post('/datHang', nguoiDungAuth, datHang)

// user features
donHangRouter.post('/donHangNguoiDung', nguoiDungAuth, donHangNguoiDung)



export default donHangRouter