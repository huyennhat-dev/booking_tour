import React from "react";

import ImageSection from "./ImageSection";
import { CiLocationOn } from "react-icons/ci";
import {
  FaBus,
  FaPlane,
  FaClock,
  FaStar,
  FaTaxi,
  FaTrain,
} from "react-icons/fa6";
import { getProvinceName } from "../../utils";
const HeaderSection = ({
  nameTour,
  destination,
  vehicles,
  photos,
  differenceInDays,
  point_rating,
}) => {
  const vehicleComponent = ({ data }) => {
    return (
      <div className="group relative  flex justify-center px-16 cursor-pointer">
        <p className="text-md font-normal flex items-center">
          Phương tiện:
          {data == "plane" && <FaPlane className="mx-2" />}
          {data == "train" && <FaTrain className="mx-2" />}
          {data == "taxi" && <FaTaxi className="mx-2" />}
          {data == "bus" && <FaBus className="mx-2" />}
          {data == "plane" && "Máy Bay"}
          {data == "train" && "Tàu Hỏa"}
          {data == "taxi" && "Taxi"}
          {data == "bus" && "Xe Bus"}
        </p>
        <span className="tooltip absolute bottom-6 scale-0 text-center rounded bg-gray-800 bg-opacity-45 p-2 text-xs text-white group-hover:scale-100">
          Tour này sẽ dùng
          <strong className="text-white mx-1">
            {data == "plane" && "Máy Bay"}
            {data == "train" && "Tàu Hỏa"}
            {data == "taxi" && "Taxi"}
            {data == "bus" && "Xe Bus"}
          </strong>
          để di chuyển
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold w-full  leading-24 text-wrap">
        {nameTour}
      </h1>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-8 w-full justify-between">
          <p className="text-md px-2 flex items-center">
            <strong>{point_rating}</strong>
            <FaStar className="mx-1 mb-[1px]" fill="#efc816" />(
            {Math.floor(Math.random() * 301) + 100}) lượt đánh giá
          </p>
          <div className="group relative  flex justify-center px-16 cursor-pointer">
            <p className="text-md font-normal flex items-center">
              <CiLocationOn strokeWidth="1.5px" className="mr-1" />
              Địa điểm: {getProvinceName(destination)}
            </p>
            <span className="tooltip absolute bottom-6 text-center scale-0 rounded bg-gray-800 bg-opacity-45   p-2 text-xs text-white group-hover:scale-100">
              Tour này có điểm đến sẽ là
              <p className="text-white mx-1 font-semibold">{getProvinceName(destination)}</p>
            </span>
          </div>

          {vehicleComponent({ data: vehicles })}
          <div className="group relative  flex justify-center px-16 cursor-pointer">
            <p className="text-md font-normal flex items-center">
              <FaClock className="mr-1" />
              Thời gian: {differenceInDays} Ngày
            </p>
            <span className="tooltip absolute bottom-6 text-center scale-0 rounded bg-gray-800 bg-opacity-45   p-2 text-xs text-white group-hover:scale-100">
              Tour này có thời gian là
              <p className="text-white mx-1 font-semibold">
                {differenceInDays} Ngày
              </p>
            </span>
          </div>
        </div>
      </div>
      <ImageSection images={photos} />
    </div>
  );
};

export default HeaderSection;
