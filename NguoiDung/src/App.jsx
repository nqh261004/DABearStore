import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TrangChu from './pages/TrangChu'
import SanPham from './pages/SanPham'
import GioiThieu from './pages/GioiThieu'
import ChiTietSanPham from './pages/ChiTietSanPham'
import GioHang from './pages/GioHang'
import DangNhap from './pages/DangNhap'
import DonHang from './pages/DonHang'
import Footer from './components/Footer'
import TimKiem from './components/TimKiem'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatHang from './pages/DatHang'

export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <TimKiem />
      <Routes>
        <Route path='/' element={<TrangChu />} />
        <Route path='/sanPham' element={<SanPham />} />
        <Route path='/gioiThieu' element={<GioiThieu />} />
        <Route path='/sanPham/:chiTietSanPhamId' element={<ChiTietSanPham />} />
        <Route path='/gioHang' element={<GioHang />} />
        <Route path="/datHang" element={<DatHang />} />
        <Route path='/dangNhap' element={<DangNhap />} />
        <Route path='/donHang' element={<DonHang />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App