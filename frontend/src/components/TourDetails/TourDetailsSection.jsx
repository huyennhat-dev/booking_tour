import React from "react";
import { styles } from "../../styles/styles";


const TourDetailsSection = ({ introduce, highlight }) => {
  return (
    <div className="col-span-4 md:col-span-8 flex flex-col items-start gap-y-4 md:gap-y-8">
      <div className="flex flex-col items-start gap-y-3 md:gap-y-5">
        <h1 className={`text-2xl font-semibold ${styles.blueText}`}>
          Điểm nổi bật
        </h1>
        <div
          className={`${styles.blueText} text-sm font-normal text-red-100 px-3`}
          dangerouslySetInnerHTML={{ __html: highlight }}
        />
        <h1 className={`${styles.blueText} text-2xl font-semibold`}>
          Tổng quan về Tour
        </h1>
        <div
          className={`${styles.blueText} text-sm font-normal px-3`}
          dangerouslySetInnerHTML={{ __html: introduce }}
        />
      </div>
    </div>
  );
};

export default TourDetailsSection;
