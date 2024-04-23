import React from "react";
import { styles } from "../../styles/styles";
import {
  TourDetailsImage1,
  TourDetailsImage2,
  TourDetailsImage3,
  TourDetailsImage4,
} from "../../assets/export";

const HeaderSection = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-4">
        <span
          className={`px-8 py-3 rounded-full bg-pink-50 text-sm font-medium ${styles.orangeText}`}
        >
          Best Seller
        </span>
        <span className="px-8 py-3 rounded-full text-sm font-medium bg-slate-100">
          Free Cancellation
        </span>
      </div>
      <h1 className="text-4xl font-semibold w-full md:w-1/2 leading-24">
        Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <p className="text-sm font-normal">4 (242)</p>
          <p className="text-sm font-normal">Paris, France</p>
        </div>
        <div className="flex items-center gap-8">
          <p className="text-sm font-normal">Share</p>
          <p className="text-sm font-normal">Whishlist</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2">
        <div className="row-span-2 col-span-7">
          <img src={TourDetailsImage1} alt="" className="rounded-lg" />
        </div>
        <div className="row-span-2 col-span-5 flex flex-col gap-y-2">
          <div className="w-full row-span-1 col-span-5">
            <img
              src={TourDetailsImage2}
              alt=""
              className="rounded-lg mt-2 md:mt-0"
            />
          </div>
          <div className="row-span-1 col-span-5 flex gap-2">
            <div className="row-span-1 col-span-2">
              <img src={TourDetailsImage3} alt="" className="rounded-lg" />
            </div>
            <div className="row-span-1 col-span-2">
              <img src={TourDetailsImage4} alt="" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
