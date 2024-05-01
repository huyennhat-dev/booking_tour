import React from "react";
import { Link } from "react-router-dom";

const TrendingDestinationCard = ({ destination }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
      <Link 
      
      to={`/tours?destination=${destination.slug}`}>
        <img
          src={destination?.image}
          alt=""
          className="rounded-full w-[135px] h-[135px] object-cover"
        />
      </Link>
      <p className="text-base font-medium">{destination?.location}</p>
      <p className="text-sm font-normal">{destination?.duration}</p>
    </div>
  );
};

export default TrendingDestinationCard;
