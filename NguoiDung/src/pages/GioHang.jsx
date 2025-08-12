import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import TieuDe from '../components/TieuDe';
import { assets } from '../assets/assets';
import TongGioHang from '../components/TongGioHang';

const GioHang = () => {
    const { sanPham, gioHang, updateSoLuong, navigate } = useContext(ShopContext); // Lấy dữ liệu từ context
    const [cartData, setCartData] = useState([]); // State để lưu dữ liệu giỏ hàng
    const { donVi } = useContext(ShopContext);

    useEffect(() => {
        if (sanPham.length > 0) {
            const tempData = []; // Đảm bảo khai báo tempData ở đây

            for (const itemId in gioHang) {
                const soLuong = gioHang[itemId]; // Lấy số lượng từng sản phẩm trong giỏ hàng
                if (soLuong > 0) {
                    tempData.push({
                        _id: itemId,
                        soLuong: soLuong,
                    });
                }
            }

            setCartData(tempData); // Cập nhật dữ liệu giỏ hàng
        }
    }, [gioHang, sanPham]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <TieuDe text1={'GIỎ HÀNG'} />
            </div>
            
            <div>
                {
                    cartData.map((item, index) => {
                        const productData = sanPham.find((sanPham) => sanPham._id === item._id);
                        return (
                            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.ten}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>Giá: </p>
                                            <p>{productData.gia}{donVi}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateSoLuong(item._id, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.soLuong} />
                                <img onClick={() => updateSoLuong(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                            </div>
                        )
                    })
                }
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <TongGioHang />
                    <div className='w-full text-end'>
                        <button onClick={() => navigate('/DatHang')} className='bg-[#f78da7] text-white text-sm my-8 px-8 py-3 rounded-lg'>MUA NGAY</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GioHang;
