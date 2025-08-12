import React from 'react';
import TieuDe from '../components/TieuDe';
import { assets } from '../assets/assets';

const DvItem = ({ imgSrc, title }) => (
    <div className="flex flex-col items-center text-center">
        <img src={imgSrc} className="w-12 mb-5" alt={title} />
        <p className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">{title}</p>
    </div>
);

const danhSachCuaHang = [
    {
        id: 1,
        hinhAnh: assets.Tiem1,
        ten: 'Bemori Bạch Mai',
        diaChi: '275 Bạch Mai, Hai Bà Trưng, Hà Nội',
        hotline: '097.989.6616',
        hoatDong: '8h30 - 23h00'
    },
    {
        id: 2,
        hinhAnh: assets.Tiem2,
        ten: 'Bemori Nguyễn Trãi',
        diaChi: '368 Nguyễn Trãi, Trung Văn',
        hotline: '033.567.6616',
        hoatDong: '8h30 - 23h00'
    },
    {
        id: 3,
        hinhAnh: assets.Tiem3,
        ten: 'Bemori Xuân Thủy',
        diaChi: '161 Xuân Thủy, Cầu Giấy',
        hotline: '033.876.6616',
        hoatDong: '8h30 - 23h00'
    },
    {
        id: 4,
        hinhAnh: assets.Tiem4,
        ten: 'Bemori Long Biên',
        diaChi: '411 Nguyễn Văn Cừ, Long Biên',
        hotline: '034.369.6616',
        hoatDong: '8h30 - 23h00'
    },
    {
        id: 5,
        hinhAnh: assets.Tiem5,
        ten: 'Bemori Đống Đa',
        diaChi: '1028 Đường Láng, Đống Đa',
        hotline: '035.369.6616',
        hoatDong: '8h30 - 23h00'
    },
    {
        id: 6,
        hinhAnh: assets.Tiem6,
        ten: 'Bemori Cầu Giấy',
        diaChi: '104 -106 Cầu Giấy',
        hotline: '039.799.6616',
        hoatDong: '8h30 - 23h00'
    },
];

const GioiThieu = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-10">
                <TieuDe text1={'GAUBONGONLINE - SHOP GẤU BÔNG ĐẸP VÀ CAO CẤP TẠI HÀ NỘI - TPHCM'} />
            </div>

            <div className="flex justify-between items-center gap-4 py-20">
                <DvItem imgSrc={assets.Dv1} title="GIAO HÀNG TẬN NHÀ" />
                <DvItem imgSrc={assets.Dv2} title="BỌC QUÀ GIÁ RẺ" />
                <DvItem imgSrc={assets.Dv3} title="TẶNG THIỆP MIỄN PHÍ" />
                <DvItem imgSrc={assets.Dv4} title="GIẶT GẤU BÔNG" />
                <DvItem imgSrc={assets.Dv5} title="NÉN NHỎ GẤU" />
            </div>

            <div className="container mx-auto p-6">
                {/* Tiêu đề */}
                <div className="text-center mb-10">
                    <TieuDe text1={'HỆ THỐNG CỬA HÀNG'} />
                </div>

                {/* Nội dung */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {danhSachCuaHang.map((cuaHang) => (
                        <div key={cuaHang.id} className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-lg shadow-md">
                            {/* Hình ảnh */}
                            <div className="flex-shrink-0">
                                <img
                                    src={cuaHang.hinhAnh}
                                    alt={cuaHang.ten}
                                    className="w-full max-w-[150px] h-auto rounded-lg shadow-sm"
                                />
                            </div>

                            {/* Thông tin */}
                            <div className="flex-1 text-left">
                                <h3 className="text-lg font-bold mb-2 text-[#f78da7]">{cuaHang.ten}</h3>
                                <p className="text-sm text-gray-700 mb-1">Địa chỉ: {cuaHang.diaChi}</p>
                                <p className="text-sm text-gray-700">Hotline: {cuaHang.hotline}</p>
                                <p className="text-sm text-gray-700">Giờ hoạt động: {cuaHang.hoatDong}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GioiThieu;
