import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import CardSanPham from '../components/CardSanPham';
import { assets } from "../assets/assets";

const sanPham = () => {
  const { sanPham, TimKiem, showTimKiem } = useContext(ShopContext);
  const [phanLoai, setPhanLoai] = useState(false);
  const [LocSanPham, setLocSanPham] = useState([]);
  const [theLoai, setTheLoai] = useState([]);

  useEffect(() => {
    setLocSanPham(sanPham);
  }, [sanPham]);

  useEffect(() => {
    Loc();
  }, [theLoai, TimKiem, showTimKiem]);

  const PhanLoai = (e) => {
    if (theLoai.includes(e.target.value)) {
      setTheLoai(prev => prev.filter(item => item !== e.target.value));
    } else {
      setTheLoai(prev => [...prev, e.target.value]);
    }
  };

  const Loc = () => {
    let sanPhamSao = sanPham.slice();

    // Lọc theo tên sản phẩm
    if (showTimKiem && TimKiem) {
      sanPhamSao = sanPhamSao.filter(item =>
        item.ten.toLowerCase().includes(TimKiem.toLowerCase())
      );
    }

    // Lọc theo thể loại
    if (theLoai.length > 0) {
      sanPhamSao = sanPhamSao.filter(item => theLoai.includes(item.phanLoai));
    }

    setLocSanPham(sanPhamSao);
  };


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setPhanLoai(!phanLoai)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          PHÂN LOẠI
          <img className={`h-3 sm:hidden transition-transform duration-300 ${phanLoai ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown icon" />
        </p>
        <div className={`border border-[#f78da7] pl-5 py-3 mt-6 ${phanLoai ? '' : 'hidden'} sm:block`}>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 hover:text-[#f78da7] checked:bg-[#f78da7] checked:border-[#f78da7]'>
              <input className='w-3 transition-all duration-300' type="checkbox" value={'GT'} onChange={PhanLoai} /> Gấu Teddy Cao Cấp
            </p>
            <p className='flex gap-2 hover:text-[#f78da7] checked:bg-[#f78da7] checked:border-[#f78da7]'>
              <input className='w-3 transition-all duration-300' type="checkbox" value={'TB'} onChange={PhanLoai} /> Thú Bông
            </p>
            <p className='flex gap-2 hover:text-[#f78da7] checked:bg-[#f78da7] checked:border-[#f78da7]'>
              <input className='w-3 transition-all duration-300' type="checkbox" value={'GB'} onChange={PhanLoai} /> Gối Ôm Dài
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          LocSanPham.map((item, index) => (
            <CardSanPham key={index} ten={item.ten} id={item._id} gia={item.gia} image={item.image} />
          ))
        }
      </div>
    </div>
  );
};

export default sanPham;
