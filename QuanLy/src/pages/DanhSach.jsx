import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, donVi } from '../App';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const DanhSach = ({ token }) => {
  const [list, setList] = useState(null); // Bắt đầu với giá trị null
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [productCount, setProductCount] = useState(0);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/sanPham/list');
      if (response.data.success) {
        setList(response.data.products);
        setProductCount(response.data.products.length);
        setLoading(false); // Đặt trạng thái tải hoàn thành
      } else {
        setError(response.data.message);
        setLoading(false); // Đặt trạng thái tải hoàn thành
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false); // Đặt trạng thái tải hoàn thành
    }
  };

  const xoaSanPham = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/sanPham/xoa', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  // Kiểm tra trạng thái tải dữ liệu và hiển thị tương ứng
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 className='mb-2'>DANH SÁCH SẢN PHẨM</h1>
      <h1 className='mb-2'>SỐ LƯỢNG SẢN PHẨM: {productCount}</h1>
      <div className='flex flex-col gap-2 '>
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>ẢNH</b>
          <b>TÊN</b>
          <b>PHÂN LOẠI</b>
          <b>GIÁ</b>
        </div>

        {list.slice().reverse().map((item, index) => (
          <div className='grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.ten}</p>
            <p>
              {
                item.phanLoai === 'GB' ? 'Gấu Teddy cao cấp' :
                  item.phanLoai === 'TB' ? 'Thú bông' :
                    item.phanLoai === 'GT' ? 'Gối ôm dài' :
                      'Không xác định'
              }
            </p>
            <p>{item.gia} {donVi}</p>
            <button
              type="button"
              onClick={() => window.location.href = `/Sua/${item._id}`} // Dẫn đến trang sửa
              className='text-ml bg-[#f78da7] text-white rounded-full border p-1'
            >
              Sửa
            </button>
            <button
              type="button"
              onClick={() => xoaSanPham(item._id)}
              className='text-ml bg-[#f78da7] text-white rounded-full border p-1'
            >
              Xóa
            </button>

          </div>
        ))}

      </div>
    </>
  );
};

export default DanhSach;
