import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import nguoiDungRouter from './routes/nguoiDungRouter.js'
import sanPhamRouter from './routes/sanPhamRouter.js'
import gioHangRouter from './routes/gioHangRouter.js'
import donHangRouter from './routes/donHangRouter.js'


const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/nguoiDung', nguoiDungRouter)

app.use('/api/sanPham', sanPhamRouter)

app.use('/api/gioHang', gioHangRouter)

app.use('/api/donHang', donHangRouter)

app.get('/', (req, res) => {
    res.send("API đang chạy")
})

app.listen(port, () => console.log('Server đang chạy với PORT: ' + port))