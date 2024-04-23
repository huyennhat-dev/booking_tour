import React from "react";
import { TourImag1 } from "../../assets/export";
import { styles } from "../../styles/styles";
import Button from "../global/Button";
import { Link, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const TourListCard = ({ tour }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/tours/${tour?.title}`);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 px-2 border md:p-3 rounded-xl gap-4">
      <img src={tour?.image} alt="tour image" className="mx-auto md:mx-0" />
      <div className="md:px-2 flex flex-col col-span-2 justify-center items-start gap-2">
        <p className="text-sm font-normal flex items-center">
          <CiLocationOn className="mr-1" /> {tour?.location}
        </p>
        <p className="text-base line-clamp-2 overflow-visible font-semibold hover:text-[color:#EB662B] cursor-pointer duration-100 ease-in-out">
          {tour?.title}
        </p>
        <p className="text-[12px]  flex items-center">
          <strong>{tour?.rating}</strong>
          <FaStar className="mx-1 mb-[1px]" fill="#efc816" />(
          {tour?.ratingQuantity}) lượt đánh giá
        </p>
        <p className="text-sm font-normal line-clamp-3 overflow-visible">
          {tour?.desc}
        </p>
        <div className="w-full flex items-center justify-between">
          <p className={`text-xs ${styles.orangeText}`}>Đảm bảo giá tốt nhất</p>
          <p className={`text-xs ${styles.orangeText}`}>Hủy tour miễn phí</p>
        </div>
      </div>
      <div className="md:ps-3 flex flex-col justify-center py-3 items-center gap-5 md:border-l">
        <p className="text-sm font-normal">{tour?.duration}</p>
        <p className="text-base font-medium">Chỉ với <strong className={styles.orangeText}>{tour?.price}</strong> đ</p>
        <Button
          title="Xem Chi Tiết"
          onclick={handleNavigate}
          classes={`${styles.orangeText} hover:text-white hover:${styles.bgOrange} transition-all duration-300 rounded-lg border border-[#EB662B] w-full py-2 text-base font-medium`}
        />
      
      </div>
    </div>
  );
};

export default TourListCard;
