/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../../styles/styles";
import TrendingDestinationCard from "./TrendingDestinationCard";
import { trendingDestination } from "../../constants/whychoosetours";

const TrendingDestinationsSection = () => {
  return (
    <div className={`py-4 md:py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Điểm đến thịnh hành</h2>
     
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-4">
        {trendingDestination.map((destination, index) => {
          return (
            <TrendingDestinationCard key={index} destination={destination} />
          );
        })}
      </div>
    </div>
  );
};

export default TrendingDestinationsSection;
