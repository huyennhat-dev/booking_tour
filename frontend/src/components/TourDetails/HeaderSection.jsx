import React from "react";
import { styles } from "../../styles/styles";
import {
  TourDetailsImage1,
  TourDetailsImage2,
  TourDetailsImage3,
  TourDetailsImage4,
} from "../../assets/export";
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
const HeaderSection = ({
  nameTour,
  destination,
  vehicles,
  photos,
  differenceInDays,
}) => {
  const vehicleComponent = ({ data }) => {
    if (data.plane)
      return (
        <div className="group relative  flex justify-center px-16 cursor-pointer">
          <p className="text-md font-normal flex items-center">
            Phương tiện: <FaPlane className="mx-2" />
            Máy bay
          </p>
          <span className="tooltip absolute bottom-6 scale-0 text-center rounded bg-gray-800 bg-opacity-45 p-2 text-xs text-white group-hover:scale-100">
            Tour này sẽ dùng
            <strong className="text-white mx-1">Máy bay</strong>
            để di chuyển
          </span>
        </div>
      );
    if (data.bus)
      return (
        <div className="group relative  flex justify-center px-16 cursor-pointer">
          <p className="text-md font-normal flex items-center">
            Phương tiện: <FaBus className="mx-2" />
            Xe bus
          </p>
          <span className="tooltip absolute bottom-6 scale-0 text-center rounded bg-gray-800 bg-opacity-45 p-2 text-xs text-white group-hover:scale-100">
            Tour này sẽ dùng
            <strong className="text-white mx-1">Xe bus</strong>
            để di chuyển
          </span>
        </div>
      );
    if (data.train)
      return (
        <div className="group relative  flex justify-center px-16 cursor-pointer">
          <p className="text-md font-normal flex items-center">
            Phương tiện: <FaTrain className="mx-2" />
            Tàu hỏa
          </p>
          <span className="tooltip absolute bottom-6 scale-0 text-center rounded bg-gray-800 bg-opacity-45 p-2 text-xs text-white group-hover:scale-100">
            Tour này sẽ dùng
            <strong className="text-white mx-1">Tàu hỏa</strong>
            để di chuyển
          </span>
        </div>
      );
    if (data.taxi)
      return (
        <div className="group relative  flex justify-center px-16 cursor-pointer">
          <p className="text-md font-normal flex items-center">
            Phương tiện: <FaTaxi className="mx-2" />
            Taxi
          </p>
          <span className="tooltip absolute bottom-6 scale-0 text-center rounded bg-gray-800 bg-opacity-45 p-2 text-xs text-white group-hover:scale-100">
            Tour này sẽ dùng
            <strong className="text-white mx-1">Taxi</strong>
            để di chuyển
          </span>
        </div>
      );

    return null;
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold w-full md:w-2/3 leading-24 text-wrap">
        {nameTour}
      </h1>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-8">
          <p className="text-md px-2 flex items-center">
            <strong>4.9</strong>
            <FaStar className="mx-1 mb-[1px]" fill="#efc816" />
            (100) lượt đánh giá
          </p>
          <div className="group relative  flex justify-center px-16 cursor-pointer">
            <p className="text-md font-normal flex items-center">
              <CiLocationOn strokeWidth="1.5px" className="mr-1" />
              Địa điểm: {destination}
            </p>
            <span className="tooltip absolute bottom-6 text-center scale-0 rounded bg-gray-800 bg-opacity-45   p-2 text-xs text-white group-hover:scale-100">
              Tour này có điểm đến sẽ là
              <p className="text-white mx-1 font-semibold">{destination}</p>
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
              <p className="text-white mx-1 font-semibold">3 Ngày</p>
            </span>
          </div>
        </div>
      </div>
      <ImageSection images={photos} />
    </div>
  );
};

export default HeaderSection;
