import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowTimKiem, demGioHang, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const dangXuat = () => {
    navigate('/dangNhap')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium font-semibold'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>TRANG CHỦ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#f78da7] hidden' />
        </NavLink>
        <NavLink to='/gioiThieu' className='flex flex-col items-center gap-1'>
          <p>GIỚI THIỆU</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#f78da7] hidden' />
        </NavLink>
        <NavLink to='/sanPham' className='flex flex-col items-center gap-1'>
          <p>SẢN PHẨM</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#f78da7] hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowTimKiem(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/dangNhap')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />
          {token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p onClick={() => navigate('/donHang')} className='cursor-pointer hover:text-[#f78da7]'>Đơn Hàng</p>
                <p onClick={dangXuat} className='cursor-pointer hover:text-[#f78da7]'>Đăng Xuất</p>
              </div>
            </div>}
        </div>
        <Link to='/gioHang' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#f78da7] text-white aspect-square rounded-full text-[8px]'>{demGioHang()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>Trở Về</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>TRANG CHỦ</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/gioiThieu'>GIỚI THIỆU</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/sanPham'>SẢN PHẨM</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
