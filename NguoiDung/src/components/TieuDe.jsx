import React from 'react';

const TieuDe = ({ text1 }) => {
  return (
    <div className='flex flex-col items-center mb-3'>
      <p className='text-[#f78da7] font-bold text-3xl'>{text1}</p>
      <div className="banner-line"></div>
    </div>
  );
};

export default TieuDe;
