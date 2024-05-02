import React from "react";
import { styles } from "../../styles/styles";
import { IoIosSend } from "react-icons/io";
import { CiMail, CiLocationOn, CiGlobe } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div
      className={`pt4 md:pt-16 mt-16 md:mt-0 pb-6 bg-[#F5F5F5] ${styles.horizontalPadding} flex flex-col shadow-2xl gap-y-6 relative `}
    >
      <div className="w-full bg-[#F5F5F5] h-full  py-12 rounded-xl flex flex-col gap-y-8 px-4 md:px-8 lg:px-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-y-10 md:gap-y-0">
          <div className="col-span-7 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium `}>
              Thông tin liên hệ
            </h6>
            <p className={`${styles.blueText} text-sm flex items-center`}>
              <CiMail className=" text-[20px] mr-1" /> Email:
              minhquy0898240032@gmail.com
            </p>
            <p className={`${styles.blueText} text-sm flex items-center`}>
              <FiPhone className=" text-[20px] mr-1" /> Số điện thoại:
              0898240032
            </p>
            <p className={`${styles.blueText} text-sm flex items-center`}>
              <CiLocationOn className=" text-[20px] mr-1" /> Địa chỉ: 254 Đ
              Nguyễn Văn Linh, Thạc Gián, Thanh Khê, Đà Nẵng, Việt Nam
            </p>
            <p className={`${styles.blueText} text-sm flex items-center`}>
              <CiGlobe className=" text-[20px] mr-1" /> Website:
              <Link to="https://www.touz.com"> https://www.touz.com</Link>
            </p>
          </div>
          <div className="col-span-3 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
            <h6 className={`text-xl ${styles.blueText} font-medium`}>
              Tin mới nhất
            </h6>
            <p className={`text-sm ${styles.blueText}`}>
              Đăng ký nhận bản tin miễn phí và luôn cập nhật
            </p>
            <div className="w-full h-[48px] flex items-center">
              <input
                type="email"
                className={`w-11/12 h-full rounded-l-xl outline-none text-sm ${styles.blueText} px-3`}
                placeholder="Nhập email của bạn"
              />
              <button className="bg-white h-full pr-3 rounded-r-xl text-sm">
                <IoIosSend className="text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
