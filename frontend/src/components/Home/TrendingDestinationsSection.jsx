import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";
import TrendingDestinationCard from "./TrendingDestinationCard";
import { trendingdestination } from "../../constants/whychoosetours";

const TrendingDestinationsSection = () => {
  return (
    <div className={`py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Trending destinations</h2>
        <Link to="/" className="text-sm font-normal">
          See All
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-4">
        {trendingdestination.map((destination, index) => {
          return (
            <TrendingDestinationCard key={index} destination={destination} />
          );
        })}
      </div>
    </div>
  );
};

export default TrendingDestinationsSection;
