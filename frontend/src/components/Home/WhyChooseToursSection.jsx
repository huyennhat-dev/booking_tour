import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { whychoosetours } from "../../constants/whychoosetours";
import WhyChooseTourCard from "./WhyChooseTourCard";

const WhyChooseToursSection = () => {
  return (
    <div className={`py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Why choose Tourz</h2>
        <Link to="/" className="text-sm font-normal">
          See All
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {whychoosetours.map((tour, index) => {
          return <WhyChooseTourCard key={index} tour={tour} />;
        })}
      </div>
    </div>
  );
};

export default WhyChooseToursSection;
