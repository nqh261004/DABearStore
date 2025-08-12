import React, { useContext, useState, useEffect } from 'react';
import TieuDe from '../components/TieuDe';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import dayjs from 'dayjs';

const DonHang = () => {
  const { backendUrl, token, donVi } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.post(backendUrl + '/api/donHang/donHangNguoiDung', {}, { headers: { token } });
      console.log(response.data)
      if (response.data.success && response.data.orders && response.data.orders.length > 0) {
        console.log(response.data)
        let allOrdersItem = [];
        response.data.orders.forEach(order => {
          response.data.orders.forEach(order => {
            const items = Array.isArray(order.sanPham) ? order.sanPham : []; // Kiểm tra và lấy sanPham
            if (items.length > 0) {
              items.forEach(item => {
                item['trangThai'] = order.trangThai;
                item['thanhToan'] = order.thanhToan;
                item['phuongThuc'] = order.phuongThuc;
                item['date'] = order.date;
                allOrdersItem.push(item);
              });
            } else {
              console.warn('Đơn hàng không có sản phẩm hợp lệ:', order);
            }
          });




        });
        setOrderData(allOrdersItem.reverse());
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(orderData)


  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (orderData.length === 0) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl'>
          <TieuDe text1={'ĐƠN HÀNG ĐÃ ĐẶT'} />
        </div>
        <p>Chưa có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <TieuDe text1={'ĐƠN HÀNG ĐÃ ĐẶT'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.ten}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{item.gia} {donVi}</p>
                  <p>Số lượng: {item.soLuong}</p>
                </div>
                <p className='mt-1'>Ngày đặt hàng: <span className='text-gray-400'>{dayjs(item.date).locale('vi').format('DD/MM/YYYY')}</span></p>
                <p className='mt-1'>Phương thức thanh toán: <span className='text-gray-400'>{item.phuongThuc}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.trangThai}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonHang;
