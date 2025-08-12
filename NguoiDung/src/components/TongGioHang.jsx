import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import TieuDe from './TieuDe';

const TongGioHang = () => {
  const { donVi, vanChuyen, getTongTien } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <TieuDe text1={'CHI TIẾT THANH TOÁN'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Tổng tiền hàng</p>
          <p>{getTongTien()} {donVi}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Phí Vận Chuyển</p>
          <p>{vanChuyen}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Tổng thanh toán</b>
          <b>{getTongTien() === 0 ? 0 : getTongTien()} {donVi}</b>
        </div>
      </div>
    </div>
  );
};

export default TongGioHang;
