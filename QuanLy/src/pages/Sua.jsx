import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useParams, useNavigate } from 'react-router-dom'

const Sua = ({ token }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [image, setImage] = useState(null);
  const [ten, setTen] = useState('');
  const [moTa1, setMoTa1] = useState('');
  const [moTa2, setMoTa2] = useState('');
  const [gia, setGia] = useState('');
  const [phanLoai, setPhanLoai] = useState('GT');
  const [bestseller, setBestseller] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/sanPham/don`, { productId: id }, { headers: { token } });
        console.log(response.data)
        if (response.data.success) {
          const product = response.data.product;
          setTen(product.ten);
          setMoTa1(product.moTa1);
          setMoTa2(product.moTa2);
          setGia(product.gia);
          setPhanLoai(product.phanLoai);
          setBestseller(product.bestseller);
          setExistingImages(product.image);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProductDetails();
  }, [id, token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("_id", id);
      formData.append("ten", ten);
      formData.append("moTa1", moTa1);
      formData.append("moTa2", moTa2);
      formData.append("phanLoai", phanLoai);
      formData.append("gia", gia);
      formData.append("bestseller", bestseller);


      formData.append("existingImages", JSON.stringify(existingImages));
      if (image) formData.append("image", image);

      const response = await axios.put(backendUrl + '/api/sanPham/sua', formData, { headers: { token } });

      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/danhSach')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Ảnh Sản Phẩm</p>
        <div className='flex gap-2'>
          <label htmlFor="image">
            <img
              className='w-20'
              src={!image ? existingImages[0] : URL.createObjectURL(image)}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>

        <div className='w-full'>
          <p className='mb-2 mt-2'>Tên Sản Phẩm</p>
          <input onChange={(e) => setTen(e.target.value)} value={ten} className='w-full max-w-[500px] px-3 py-2' type="text" />
        </div>

        <div className='w-full'>
          <p className='mb-2 mt-2'>Mô Tả 1</p>
          <input onChange={(e) => setMoTa1(e.target.value)} value={moTa1} className='w-full max-w-[500px] px-3 py-2' type="text" />
        </div>

        <div className='w-full'>
          <p className='mb-2 mt-2'>Mô Tả 2</p>
          <input onChange={(e) => setMoTa2(e.target.value)} value={moTa2} className='w-full max-w-[500px] px-3 py-2' type="text" />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mt-2'>
          <div>
            <p className='mb-2'>Phân Loại</p>
            <select onChange={(e) => setPhanLoai(e.target.value)} className='w-full px-3 py-2'>
              <option value="GT">Gấu Teddy Cao Cấp</option>
              <option value="TB">Thú Bông</option>
              <option value="GB">Gối Ôm Dài</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Giá Sản Phẩm</p>
            <input onChange={(e) => setGia(e.target.value)} value={gia} className='w-full px-3 py-2 sm:w-[120px]' type="number" />
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Sản Phẩm BestSeller</label>
        </div>

        <button type="submit" className='w-40 py-3 mt-4 bg-[#f78da7] text-white rounded-full'>SỬA SẢN PHẨM</button>
      </div>
    </form>
  );
};

export default Sua;
