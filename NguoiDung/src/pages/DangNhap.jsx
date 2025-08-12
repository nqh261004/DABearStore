import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const dangNhap = () => {
  const [currentState, setCurrentState] = useState('ĐĂNG NHẬP');

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'ĐĂNG KÝ') {
        const response = await axios.post(backendUrl + '/api/nguoiDung/dangKy', { ten, email, matKhau });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/nguoiDung/dangNhap', { email, matKhau });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-6 text-[#f78da7] font-semibold'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>
      {currentState === 'ĐĂNG NHẬP' ? '' :
        <input
          onChange={(e) => setTen(e.target.value)}
          type="text"
          className='w-full px-4 py-3 border border-[#f78da7] rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
          placeholder='Nhập tài khoản'
          required
        />
      }
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className='w-full px-4 py-3 border border-[#f78da7] rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
        placeholder='Nhập email'
      />
      <input
        onChange={(e) => setMatKhau(e.target.value)}
        type="password"
        className='w-full px-4 py-3 border border-[#f78da7] rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
        placeholder='Nhập mật khẩu'
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
      >
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1c5.523 0 10 4.477 10 10a10.05 10.05 0 01-.825 3.875M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.497 5 12 5c.939 0 1.857.138 2.732.396" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          </svg>
        )}
      </span>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === 'ĐĂNG NHẬP'
            ? <p onClick={() => setCurrentState('ĐĂNG KÝ')} className='cursor-pointer text-gray-700 hover:text-[#f78da7]'>Tạo tài khoản</p>
            : <p onClick={() => setCurrentState('ĐĂNG NHẬP')} className='cursor-pointer text-gray-700 hover:text-[#f78da7]'>Đăng nhập tại đây</p>
        }
      </div>
      <button className='bg-[#f78da7] hover:bg-while text-white font-semibold px-8 py-3 mt-6 rounded-full transition-all duration-300'>{currentState === 'ĐĂNG NHẬP' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</button>
    </form>
  )
}

export default dangNhap
