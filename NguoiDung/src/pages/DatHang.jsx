import React, { useContext, useState } from 'react';
import TieuDe from '../components/TieuDe';
import TongGioHang from '../components/TongGioHang';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DatHang = () => {
    const [method, setMethod] = useState('cod');
    const [loading, setLoading] = useState(false);

    const { navigate, backendUrl, token, gioHang, setGioHang, getTongTien, sanPham } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        hoTen: '',
        email: '',
        dienThoai: '',
        diaChi: '',
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!formData.hoTen || !formData.email || !formData.dienThoai || !formData.diaChi) {
            return toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        setLoading(true);
        try {
            let orderItems = [];
            for (const items in gioHang) {
                if (gioHang[items] > 0) {
                    const itemInfo = structuredClone(
                        sanPham.find((sanPham) => sanPham._id === items)
                    );
                    if (itemInfo) {
                        itemInfo.soLuong = gioHang[items];
                        orderItems.push(itemInfo);
                    }
                }
            }

            let orderData = {
                diaChi: formData,
                sanPham: orderItems,
                tongTien: getTongTien(),
            };

            if (method === 'cod') {
                const response = await axios.post(`${backendUrl}/api/donHang/datHang`, orderData, {
                    headers: { token },
                });
                if (response.data.success) {
                    setGioHang({});
                    navigate('/donHang');
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <TieuDe text1={'ĐỊA CHỈ NHẬN HÀNG'} />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="hoTen"
                    value={formData.hoTen}
                    className="border border-[#f78da7] rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Họ và Tên"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="email"
                        value={formData.email}
                        className="border border-[#f78da7] rounded py-1.5 px-3.5 w-full"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="dienThoai"
                        value={formData.dienThoai}
                        className="border border-[#f78da7] rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Số điện thoại"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="diaChi"
                    value={formData.diaChi}
                    className="border border-[#f78da7] rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Địa chỉ"
                />
            </div>

            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <TongGioHang />
                </div>
                <div className="mt-12">
                    <TieuDe text1={'Phương thức thanh toán'} />
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <label className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={method === 'cod'}
                                onChange={() => setMethod('cod')}
                                className="hidden"
                            />
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''
                                    }`}
                            ></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">Thanh toán khi nhận hàng</p>
                        </label>
                    </div>

                    <div className="w-full flex justify-center items-center mt-8">
                        <button
                            disabled={loading}
                            className={`bg-[#f78da7] text-white px-16 py-3 text-sm rounded-lg shadow-md ${loading ? 'opacity-50' : ''
                                }`}
                        >
                            {loading ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default DatHang;
