import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import TieuDe from './TieuDe';
import CardSanPham from './CardSanPham';

const SanPhamBanChay = () => {
    const { sanPham } = useContext(ShopContext);
    const [SanPhamBanChay, setBanChay] = useState([]);

    useEffect(() => {
        // Filter the bestseller products and limit to the first 5
        const filteredBestsellers = sanPham.filter((item) => item.bestseller);
        setBanChay(filteredBestsellers.slice(0, 5));
    }, [sanPham]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <TieuDe text1={'SẢN PHẨM BÁN CHẠY'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    SanPhamBanChay.map((item, index) => (
                        <CardSanPham key={index} id={item._id} image={item.image} ten={item.ten} gia={item.gia} />
                    ))
                }
            </div>
        </div>
    );
};

export default SanPhamBanChay;
