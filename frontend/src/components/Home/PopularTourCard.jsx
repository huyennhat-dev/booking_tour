/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
const PopularTourCard = ({ spot }) => {
  return (
    <div className="border py-2 px-3 rounded-xl flex flex-col items-start gap-y-2 bg-white hover:shadow-xl transition-all duration-300">
      <Link to={`/tours/${spot.title}`} className="w-full">
        <img src={spot?.image} alt="" className="w-full h-[198px]" />
      </Link>
      <p className="text-[12px] text-[#717171] font-normal flex items-center">
        <CiLocationOn className="mr-1" />
        {spot?.location}
      </p>
      <Link to={`/tours/${spot.title}`} className="w-full">
        <h4 className="hover:text-blue-800 text-base font-medium ">
          {spot?.title}
        </h4>
      </Link>
      <p className="text-[12px] px-2 flex items-center">
        <strong>{spot?.rating}</strong>
        <FaStar className="mx-1 mb-[1px]" fill="#efc816" />(
        {spot?.ratingQuantity}) lượt đánh giá
      </p>
      <div className="border w-full"></div>
      <div className="w-full flex items-center justify-between px-2">
        <p className="text-[12px]">{spot?.duration} ngày</p>
        <p className="">
          Chỉ với
          <span className="text-[color:#eb662b] font-semibold ml-1">
            {spot?.price} đ
          </span>
        </p>
      </div>
    </div>
  );
};

export default PopularTourCard;
