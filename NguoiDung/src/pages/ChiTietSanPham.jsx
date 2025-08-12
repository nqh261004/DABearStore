import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import SanPhamDeXuat from '../components/SanPhamDeXuat';

const chiTietSanPham = () => {
  const { chiTietSanPhamId } = useParams();
  const { sanPham, themGioHang } = useContext(ShopContext);
  const [sanPhamData, setSanPhamData] = useState(null); // Đổi thành null để quản lý đúng trạng thái chưa tải dữ liệu
  const [image, setImage] = useState('');
  const { donVi } = useContext(ShopContext);

  const fetchSanPhamData = () => {
    const timSanPham = sanPham.find(item => item._id === chiTietSanPhamId);
    if (timSanPham) {
      setSanPhamData(timSanPham);
      setImage(timSanPham.image[0]);
    }
  };

  useEffect(() => {
    fetchSanPhamData();
  }, [chiTietSanPhamId, sanPham]);

  return sanPhamData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='w-full sm:w-[100%]'>
            <img className='w-full h-auto' src={image} alt="Product" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{sanPhamData.ten}</h1>
          <p className='mt-5 text-3xl font-medium'>{sanPhamData.gia} {donVi}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>Chất Vải: {sanPhamData.moTa1}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>Chất Liệu Bông: {sanPhamData.moTa2}</p>
          <button onClick={() => themGioHang(sanPhamData._id)} className='text-white px-8 py-3 text-sm bg-[#f78da7] mt-5 rounded-lg'>THÊM VÀO GIỎ HÀNG</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✓ 100% bông trắng tinh khiết</p>
            <p>✓ 100% ảnh chụp tại shop</p>
            <p>✓ Bảo hành Bông gấu 6 tháng</p>
            <p>✓ Bảo hành đường chỉ trọn đời</p>
            <p>✓ Miễn phí Nén chân không gấu</p>
            <p>✓ Miễn phí Tặng thiệp</p>
            <p>✓ Miễn phí Gói quà</p>
          </div>
          <div className='text-xl text-[#f78da7] mt-5 flex flex-col gap-1'>
            <p>ĐẶT HÀNG ONLINE: 097.989.6616</p>
            <p>MUA HÀNG BUÔN/ SỈ: 03.9797.6616</p>
            <p>HOTLINE PHẢN ÁNH: 039.333.6616</p>
          </div>

        </div>
      </div>
      <SanPhamDeXuat
        phanLoai={sanPhamData.phanLoai}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default chiTietSanPham;
