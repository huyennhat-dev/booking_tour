import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { toptrending } from "../../constants/whychoosetours";
import PopularTourCard from "./PopularTourCard";

const TopTrending = () => {
  return (
    <div className={`py-16 ${styles.horizontalPadding}`}>
      <div className="bg-[#F5F5F5] w-full py-12 rounded-xl flex flex-col gap-y-12">
        <div className="w-full flex items-center justify-between px-4 md:px-8 lg:px-16">
          <h2 className={`text-2xl font-bold`}>Top Trending</h2>
          <Link to="/" className="text-sm font-normal">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-16">
          {toptrending.map((spot, index) => {
            return <PopularTourCard key={index} spot={spot} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopTrending;
