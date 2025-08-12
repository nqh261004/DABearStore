import React from 'react'
import { assets } from '../assets/assets';
import TieuDe from './TieuDe';

const DichVu = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div className='text-center py-8 text-3xl'>
                <TieuDe text1={'CÁC DỊCH VỤ CỦA GẤU BÔNG BEMORI'} />
            </div>
            <div>
                <img src={assets.Dv1} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>GIAO HÀNG TẬN NHÀ</p>
            </div>

            <div>
                <img src={assets.Dv2} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>BỌC QUÀ GIÁ RẺ</p>
            </div>
            <div>
                <img src={assets.Dv3} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>TẶNG THIỆP MIỄN PHÍ</p>
            </div>

            <div>
                <img src={assets.Dv4} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>GIẶT GẤU BÔNG</p>
            </div>

            <div>
                <img src={assets.Dv5} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>NÉN NHỎ GẤU</p>
            </div>
        </div>
    )
}

export default DichVu
