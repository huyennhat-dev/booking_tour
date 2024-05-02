import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import provinces from "../../_mock/province";
import {
  calculateDateDifference,
  createSlug,
  formatCurrencyVND,
} from "../../utils/index";
const PopularTourCard = ({ tour }) => {
  const getProvinceName = (slug) => {
    const province = provinces.find((p) => p.slug === slug);
    return province ? province.name : "Không tìm thấy tỉnh";
  };
  return (
    <div className="relative border py-2 px-3 rounded-xl flex flex-col items-start gap-y-2 bg-white hover:shadow-xl transition-all duration-300">
      <Link
        to={`/tours/${createSlug(tour.tour_name)}?id=${tour.id}`}
        className="w-full"
      >
        <img
          src={tour.photos[0]}
          alt={tour.tour_name}
          title={tour.tour_name}
          className="w-full h-[198px] rounded"
        />
      </Link>
      <p className="text-xs text-[#717171] font-normal flex items-center">
        <CiLocationOn className="mr-1" />
        {getProvinceName(tour.destination)}
      </p>
      <Link
        to={`${createSlug(`/tours/${tour.tour_name}`)}?id=${tour.id}`}
        className="w-full"
      >
        <h4 className="hover:text-blue-800 text-base font-medium line-clamp-2 overflow-hidden">
          {tour?.tour_name}
        </h4>
      </Link>
      <p className="text-xs px-2 flex items-center">
        <strong className="text-sm">{tour?.point_rating}</strong>
        <FaStar className="mx-1 mb-[1px]" fill="#efc816" />
        <span className="mr-1 text-xs">
          ({Math.floor(Math.random() * 301) + 100})
        </span>
        lượt đánh giá
      </p>
      {tour.promotional > 0 && (
        <div className="w-full text-xs px-2 flex items-center justify-between">
          <p>
            Giá gốc:
            <span className="ml-1 font-semibold text-gray-500 line-through text-sm">
              {formatCurrencyVND(tour?.initial_price)}
            </span>
          </p>
          <p>
            Giảm mạnh:
            <span className="ml-1 font-semibold text-red-500  text-sm">
              {tour.promotional * 100} %
            </span>
          </p>
        </div>
      )}
      <div
        className={`w-full px-2 ${
          tour.promotional == 0 && "px-5 absolute bottom-[9px] left-0"
        }`}
      >
        <div className="border w-full"></div>
        <div className="flex items-center justify-between">
          <p className="text-xs">
            {calculateDateDifference(tour.departure_day, tour.end_tour_day)}{" "}
            ngày
          </p>
          <p className="text-xs flex items-center">
            Chỉ với
            <span className="text-[color:#eb662b] font-semibold ml-2 text-xl">
              {formatCurrencyVND(
                tour.initial_price - tour.initial_price * tour.promotional
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularTourCard;
