/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { whyChooseTours } from "../../constants/whychoosetours";
import WhyChooseTourCard from "./WhyChooseTourCard";
import appData from "../../_mock/appData";

const WhyChooseToursSection = () => {
  return (
    <div className={`py-4 md:py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Tại sao chọn {appData.appName}</h2>
       
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {whyChooseTours.map((tour, index) => {
          return <WhyChooseTourCard key={index} tour={tour} />;
        })}
      </div>
    </div>
  );
};

export default WhyChooseToursSection;
