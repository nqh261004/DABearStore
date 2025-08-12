import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const DangNhap = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/nguoiDung/admin`, { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-r from-pink-100 via-pink-150 to-pink-200'>
            <div className='bg-white shadow-xl rounded-xl px-8 py-6 max-w-md w-[90%]'>
                <h1 className='text-3xl font-bold text-[#f78da7] mb-6 text-center'>BEMORI - QUẢN LÝ</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <label className='text-sm font-medium text-gray-700 mb-2 block'>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
                            placeholder='Nhập email'
                            required
                        />
                    </div>
                    <div className='mb-4 relative'>
                        <label className='text-sm font-medium text-gray-700 mb-2 block'>Mật khẩu</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
                            placeholder='Nhập mật khẩu'
                            required
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
                                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 01-6 0 3 3 0 016 0z" /> */}
                                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.497 5 12 5c.939 0 1.857.138 2.732.396M18.364 18.364A9.985 9.985 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1c2.4 0 4.6.822 6.364 2.364M22 22l-4.586-4.586" /> */}
                                </svg>
                            )}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className='w-full py-3 px-4 rounded-full text-white bg-[#f78da7] hover:bg-white-600 font-semibold transition-all duration-300'
                    >
                        ĐĂNG NHẬP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DangNhap
