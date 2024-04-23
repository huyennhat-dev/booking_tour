import React from "react";
import { TrendingDestination1 } from "../../assets/export";

const TrendingDestinationCard = ({ destination }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
      <img src={destination?.image} alt="" className="" />
      <p className="text-base font-medium">{destination?.location}</p>
      <p className="text-sm font-normal">{destination?.duration}</p>
    </div>
  );
};

export default TrendingDestinationCard;
