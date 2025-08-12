import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import TieuDe from './TieuDe';
import CardSanPham from './CardSanPham';

const SanPhamDeXuat = () => {
    const { sanPham } = useContext(ShopContext);
    const [deXuat, setdeXuat] = useState([]);

    useEffect(() => {
        if (sanPham.length > 0) {
            // Lấy ngẫu nhiên 5 sản phẩm từ danh sách sản phẩm
            const randomProducts = sanPham
                .sort(() => 0.5 - Math.random()) // Trộn mảng sản phẩm
                .slice(0, 5); // Lấy 5 sản phẩm đầu tiên sau khi trộn

            setdeXuat(randomProducts);
        }
    }, [sanPham]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <TieuDe text1={'SẢN PHẨM ĐỀ XUẤT'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {deXuat.map((item, index) => (
                    <CardSanPham key={index} id={item._id} image={item.image} ten={item.ten} gia={item.gia} />
                ))}
            </div>
        </div>
    );
};

export default SanPhamDeXuat;
