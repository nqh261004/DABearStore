import React from 'react'
import Banner from '../components/Banner'
import SanPhamMoi from '../components/SanPhamMoi'
import SanPhamBanChay from '../components/SanPhamBanChay'
import DichVu from '../components/DichVu'
import { assets } from "../assets/assets"

const trangChu = () => {
  const images = [assets.Banner3, assets.Banner1, assets.Banner2];
  return (
    <div>
      <Banner images={images} />
      <SanPhamMoi />
      <SanPhamBanChay />
      <DichVu />
    </div>
  )
}

export default trangChu