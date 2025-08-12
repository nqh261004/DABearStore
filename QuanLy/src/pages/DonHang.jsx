import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, donVi } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const DonHang = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Hàm lấy danh sách đơn hàng
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/donHang/list', {}, { headers: { token } });
      console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Đảo ngược danh sách đơn hàng
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Hàm cập nhật trạng thái đơn hàng
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/donHang/trangThai',
        { orderId, trangThai: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders(); // Load lại danh sách đơn hàng sau khi cập nhật
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Dùng useEffect để gọi API lần đầu tiên
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>DANH SÁCH ĐƠN HÀNG</h3>
      <div>
        {orders.map((donHang, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            {/* Icon đơn hàng */}
            <img className="w-12" src={assets.parcel_icon} alt="" />

            {/* Thông tin sản phẩm */}
            <div>
              <div>
                {donHang.sanPham.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.ten} x {item.soLuong}
                  </p>
                ))}
              </div>
              {/* Thông tin địa chỉ */}
              <div>
                {/* Thông tin địa chỉ */}
                <p className="mt-3 mb-2 font-medium">Tên: {donHang.diaChi.hoTen}</p>
                <p className="mt-3 mb-2 font-medium">Địa chỉ: {donHang.diaChi.diaChi}</p>
                <p className="mt-3 mb-2 font-medium">Số điện thoại: {donHang.diaChi.dienThoai}</p>
              </div>

            </div>

            {/* Thông tin đơn hàng */}
            <div>
              <p className="text-sm sm:text-[15px]">Tổng sản phẩm: {donHang.sanPham.length}</p>
              <p className="mt-3">Phương thức: {donHang.phuongThuc}</p>
              <p>Thanh toán: {donHang.thanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
              <p>Ngày đặt hàng: {new Date(donHang.date).toLocaleDateString('vi-VN')}</p>
            </div>

            {/* Tổng tiền */}
            <p className="text-sm sm:text-[15px]">{donHang.tongTien.toLocaleString()} {donVi}</p>

            {/* Trạng thái đơn hàng */}
            <select
              onChange={(event) => statusHandler(event, donHang._id)}
              value={donHang.trangThai}
              className="p-2 font-semibold"
            >
              <option value="Xác Nhận Đơn Hàng">Xác Nhận</option>
              <option value="Đơn Hàng Đang Được Chuẩn Bị">Chuẩn Bị</option>
              <option value="Đơn Hàng Đang Được Giao">Đang Giao</option>
              <option value="Giao Hàng Thành Công">Đã Giao</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonHang;
