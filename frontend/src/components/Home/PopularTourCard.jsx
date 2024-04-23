import React from "react";
import { Tour1 } from "../../assets/export";

const PopularTourCard = ({ spot }) => {
  return (
    <div className="border py-2 px-3 rounded-xl flex flex-col items-start gap-y-2 bg-white hover:shadow-xl hover:cursor-pointer transition-all duration-300">
      <img src={spot?.image} alt="" className="w-full h-[198px]" />
      <p className="text-[12px] text-[#717171] font-normal">{spot?.location}</p>
      <h4 className="text-base font-medium">{spot?.title}</h4>
      <p className="text-[12px]">{spot?.rating}</p>
      <div className="border w-full"></div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[12px]">{spot?.duration}</p>
        <p className="">From {spot?.price}</p>
      </div>
    </div>
  );
};

export default PopularTourCard;
