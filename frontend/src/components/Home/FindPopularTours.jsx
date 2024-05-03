/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import PopularTourCard from "./PopularTourCard";

const FindPopularTours = ({data}) => {
  return (
    <div className={`py-4 md:py-16 ${styles.horizontalPadding} flex flex-col gap-y-4 md:gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Tour phổ biến</h2>
        <Link
          to="/tours?keyword=popular"
          className="text-sm font-normal hover:text-[color:#eb662b] duration-100"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((tour, index) => {
          return <PopularTourCard key={index} tour={tour} />;
        })}
      </div>
    </div>
  );
};

export default FindPopularTours;
