import React, { useState, useEffect } from "react";

const Banner = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide
  useEffect(() => {
    if (images && Array.isArray(images) && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Chuyển slide mỗi 5 giây

      // Dọn dẹp interval khi component unmount
      return () => clearInterval(interval);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Kiểm tra nếu images có giá trị
  if (!images || !Array.isArray(images) || images.length === 0) {
    return
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </div>

      <button className="carousel-control prev" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
