import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'

const CardSanPham = ({ id, ten, gia, image }) => {
    const { donVi } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/sanPham/${id}`}>
            <div className='overflow-hidden transform transition-transform duration-300 hover:scale-105'>
                <img className='hover:scale-110 transition ease-in-out' src={image && image[0]} alt={ten} />
            </div>
            <p className='pt-3 pb-1 text-sm'>{ten}</p>
            <p className='text-sm font-medium'>{gia} {donVi}</p>
        </Link>
    )
}

export default CardSanPham
