import express from 'express'
import { themGioHang, capNhatGioHang, layGioHang} from '../controllers/gioHangController.js'
import authUser from '../middleware/auth.js'

const gioHangRouter = express.Router()

gioHangRouter.post('/lay' , authUser, layGioHang)
gioHangRouter.post('/them' , authUser, themGioHang)
gioHangRouter.post('/capNhat' , authUser, capNhatGioHang)

export default gioHangRouter