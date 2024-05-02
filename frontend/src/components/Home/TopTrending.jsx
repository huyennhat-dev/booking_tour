import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { topTrending } from "../../constants/whychoosetours";
import PopularTourCard from "./PopularTourCard";

const TopTrending = ({data}) => {
  return (
    <div className={`py-4 md:py-16 ${styles.horizontalPadding}`}>
      <div className="bg-[#F5F5F5] w-full py-12 rounded-xl flex flex-col gap-y-12">
        <div className="w-full flex items-center justify-between px-4 md:px-8 lg:px-16">
          <h2 className={`text-2xl font-bold`}>Xu hướng hàng đầu</h2>
          <Link
            to="/tours?keyword=trend"
            className="text-sm font-normal hover:text-[color:#eb662b] duration-100"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-16">
          {data?.map((tour, index) => {
            return <PopularTourCard key={index} tour={tour} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopTrending;
