import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
export const ShopContext = createContext();
import axios from 'axios'

const ShopContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const donVi = 'VNĐ';
    const vanChuyen = 'Miễn Phí';
    const [timKiem, setTimKiem] = useState('');
    const [sanPham, setSanPham] = useState([]);
    const [showTimKiem, setShowTimKiem] = useState(false);
    const [token, setToken] = useState('');

    const [gioHang, setGioHang] = useState({});
    const navigate = useNavigate();

    const themGioHang = async (itemId) => {
        let cartData = structuredClone(gioHang);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setGioHang(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/gioHang/them', { itemId }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const demGioHang = () => {
        let tongDau = 0;
        for (const items in gioHang) {
            try {
                if (gioHang[items] > 0) {
                    tongDau += gioHang[items];
                }
            } catch (error) {
                // Handle error if needed
            }
        }
        return tongDau;
    }

    const updateSoLuong = async (itemId, soLuong) => {
        let cartData = structuredClone(gioHang);
        cartData[itemId] = soLuong;

        setGioHang(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/gioHang/capNhat', { itemId, soLuong }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getTongTien = () => {
        let tongTien = 0;

        // Duyệt qua từng sản phẩm trong giỏ hàng
        for (const itemId in gioHang) {
            let itemInfo = sanPham.find((sanPham) => sanPham._id === itemId);

            // Kiểm tra xem sản phẩm có tồn tại không
            if (itemInfo) {
                // Duyệt qua số lượng của từng sản phẩm trong giỏ hàng
                let soLuong = gioHang[itemId];
                if (soLuong > 0) {
                    tongTien += itemInfo.gia * soLuong;
                }
            }
        }

        return tongTien;
    };

    const getSanPhamData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/sanPham/list`);
            if (response.data.success) {
                setSanPham(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/gioHang/lay', {}, { headers: { token } })
            if (response.data.success) {
                setGioHang(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getSanPhamData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])


    const value = {
        sanPham, donVi, vanChuyen,
        timKiem, setTimKiem, showTimKiem, setShowTimKiem,
        gioHang, themGioHang, setGioHang,
        demGioHang, updateSoLuong, getTongTien,
        navigate, backendUrl,
        setToken, token, getUserCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider