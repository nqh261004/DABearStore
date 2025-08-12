import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-14 my-10 text-sm px-0">
        {/* Thông tin cửa hàng */}
        <div className="px-4">
          <div className="mb-3">
            <p className="text-xl font-medium mb-5  text-[#f78da7] text-[#f78da7]">HỘ KINH DOANH BEMORI</p>
            <p className="flex flex-col gap-1 text-gray-600">
              Số 19 ngõ 23 Nguyễn Khuyến, tổ dân phố 5, Phường Văn Quán, Quận Hà Đông, Thành phố Hà Nội, Việt Nam
              <br />
              SĐT: 0979836886
              <br />
              Mã số đăng ký hộ kinh doanh: 0108977908-001
              <br />
              ✉ Email: gaubongonline6@gmail.com
            </p>
          </div>
        </div>

        {/* Chuyển khoản Online */}
        <div className="px-4">
          <p className="text-xl font-medium mb-5 text-[#f78da7] text-[#f78da7]">CHUYỂN KHOẢN ONLINE</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>TECHCOMBANK</li>
            <li>STK: 13324816911019</li>
            <li>Chủ TK: Nguyễn Phương Hoa – CN Láng Hạ</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="px-4">
          <p className="text-xl font-medium mb-5 text-[#f78da7] text-[#f78da7]">XEM GẤU BÔNG VỚI</p>
          <ul className="footer-socials flex flex-wrap gap-3">
            <li>
              <a href="https://www.facebook.com/Shop.Gaubongonline.vn/" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-09-1-e1702435231105.png" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/shop.gaubongonline.vn?igshid=YzAwZjE1ZTI0Zg==" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-05-e1702435278909.png" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@BEMORI.OFFICIAL" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-06-e1702435291336.png" alt="YouTube" />
              </a>
            </li>
            <li>
              <a href="https://shopee.vn/gaubongonlinee" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-10-1-e1702435305485.png" alt="Shopee" />
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@gaubongonline03?_t=8hQzqy3NYfQ&_r=1" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-08-1-e1702435316359.png" alt="TikTok" />
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/9SRnAHdBTS3GNcMBA" target="_blank" rel="nofollow">
                <img src="https://gaubongonline.vn/wp-content/uploads/2023/11/Logo-cac-san-07-e1702435331798.png" alt="Google Maps" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="w-full py-5 text-sm text-center font-semibold">
        Copyright {new Date().getFullYear()} © GẤU BÔNG ONLINE
      </div>
    </div>
  );
};

export default Footer;
