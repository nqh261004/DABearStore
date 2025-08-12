import React, { useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import DanhMuc from './components/DanhMuc'
import { Routes, Route } from 'react-router-dom'
import Them from './pages/Them'
import DanhSach from './pages/DanhSach'
import DonHang from './pages/DonHang'
import Sua from './pages/Sua'
import DangNhap from './components/DangNhap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const donVi = 'VNĐ'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = ({}) => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <DangNhap setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <DanhMuc />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/them' element={<Them token={token} />} />
                <Route path='/danhSach' element={<DanhSach token={token} />} />
                <Route path='/sua/:id' element={<Sua token={token} />} />
                <Route path='/donHang' element={<DonHang token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App

