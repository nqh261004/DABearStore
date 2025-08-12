import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const TimKiem = () => {
  const { timKiem, setTimKiem, showTimKiem, setShowTimKiem } = useContext(ShopContext);


  return showTimKiem ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-[#f78da7] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={timKiem}
          onChange={(e) => setTimKiem(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Nhập sản phẩm cần tìm"
        />
        <img className="w-4" src={assets.search_icon} alt="Search Icon" />
      </div>
      <img
        onClick={() => setShowTimKiem(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close Icon"
      />
    </div>
  ) : null;
};

export default TimKiem;
