import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import TieuDe from './TieuDe';
import CardSanPham from './CardSanPham';

const SanPhamMoi = () => {
    const { sanPham } = useContext(ShopContext);
    const [SanPhamMoi, setSanPhamMoi] = useState([]);

    useEffect(() => {
        const startIndex = Math.max(0, sanPham.length - 10); // Vị trí bắt đầu của 10 sản phẩm cuối
        const newSanPhamMoi = sanPham.slice(startIndex);
        setSanPhamMoi(newSanPhamMoi);
    }, [sanPham]);
    

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3x1'>
                <TieuDe text1={'SẢN PHẨM MỚI NHẤT'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    SanPhamMoi.map((item, index) => (
                        <CardSanPham key={index} id={item._id} image={item.image} ten={item.ten} gia={item.gia} />))
                }
            </div>
        </div>
    )
}

export default SanPhamMoi
