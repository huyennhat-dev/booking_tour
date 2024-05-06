import React from "react";
import { styles } from "../../styles/styles";
import Button from "../global/Button";
import { Link, useNavigate } from "react-router-dom";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

import {
  calculateDateDifference,
  createSlug,
  formatCurrencyVND,
  getProvinceName,
} from "../../utils/index";
import { GiCheckMark } from "react-icons/gi";

const TourListCard = ({ tour }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/tours/${createSlug(tour?.tour_name)}?id=${tour.id}`);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 px-2 border md:p-3 rounded-xl gap-4 hover:shadow-xl duration-200 ease-in-out">
      <img
        src={tour?.photos[0]}
        alt="tour image"
        className="mx-auto md:mx-0 rounded"
      />
      <div className="md:px-2 flex flex-col col-span-2 justify-center items-start gap-1">
        <div className="text-sm font-normal flex items-center justify-between w-full">
          <div className="flex items-center">
            <CiLocationOn className="mr-1" />
            {getProvinceName(tour?.destination)}
          </div>
          <p className="text-sm font-normal flex items-center">
            <CiClock1 className="mr-1" />
            {calculateDateDifference(
              tour?.departure_day,
              tour?.end_tour_day
            )}{" "}
            Ngày{" "}
            {calculateDateDifference(tour?.departure_day, tour?.end_tour_day) -
              1}{" "}
            Đêm
          </p>
        </div>
        <Link to={`/tours/${createSlug(tour?.tour_name)}?id=${tour.id}`}>
          <p className="text-base line-clamp-2 overflow-visible font-semibold hover:text-[color:#EB662B] cursor-pointer duration-100 ease-in-out">
            {tour?.tour_name}
          </p>
        </Link>
        <p className="text-[12px]  flex items-center">
          <span>Ngày đi: {tour.departure_day}</span>
          <span className="ml-5">Ngày về: {tour.end_tour_day}</span>
        </p>
        <p className="text-[12px]  flex items-center">
          <strong>{tour?.point_rating}</strong>
          <FaStar className="mx-1 mb-[1px]" fill="#efc816" />(
          {Math.floor(Math.random() * 301) + 100}) lượt đánh giá
        </p>
        <p className="text-sm font-normal line-clamp-3 overflow-visible">
          {tour?.desc}
        </p>
        <div className="w-full ">
          {tour?.insurance && (
            <p className={`text-xs flex items-center`}>
              <GiCheckMark fill="#EB662B" className="mr-2" /> Bảo hiểm chuyến đi
            </p>
          )}
          {tour?.meal && (
            <p className={`text-xs flex items-center`}>
              <GiCheckMark fill="#EB662B" className="mr-2" />
              Ăn uống trọn gói
            </p>
          )}
          <p className={`text-xs flex items-center`}>
            <GiCheckMark fill="#EB662B" className="mr-2" />
            Hướng dẫn viên nhiệt tình
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className={`text-xs ${styles.orangeText}`}>Đảm bảo giá tốt nhất</p>
          <p className={`text-xs ${styles.orangeText}`}>Hủy tour miễn phí</p>
        </div>
      </div>
      <div className="md:ps-3 flex flex-col justify-center py-3 items-center gap-2 md:border-l">
        {tour?.promotional > 0 && (
          <div className="text-xs font-medium flex items-center justify-between w-full px-4">
            <div className="flex items-center">
              <span>Giá gốc: </span>
              <strong
                className={`font-semibold text-gray-500 line-through text-sm mx-2 `}
              >
                {formatCurrencyVND(tour?.initial_price)}
              </strong>
            </div>
            <div className="flex items-center">
              <span>Giảm: </span>
              <strong
                className={`font-semibold ${styles.orangeText} text-base ml-1`}
              >
                {(tour?.promotional * 100).toFixed(0)}%
              </strong>
            </div>
          </div>
        )}
        <p className="text-sm font-medium flex items-center">
          <span>{tour?.promotional > 0 ? "Chỉ còn" : "Chỉ với"}</span>
          <strong className={`${styles.orangeText} mx-2 text-xl`}>
            {formatCurrencyVND(
              tour?.initial_price - tour?.initial_price * tour?.promotional
            )}
          </strong>
        </p>
        <Button
          title="Xem Chi Tiết"
          onclick={handleNavigate}
          classes={`${styles.orangeText} hover:text-white hover:bg-[color:#EB662B] transition-all duration-300 rounded-lg border border-[#EB662B] w-full py-2 text-base font-medium`}
        />
      </div>
    </div>
  );
};

export default TourListCard;
