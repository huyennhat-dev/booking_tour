import React from "react";
import { styles } from "../../styles/styles";

const CommonHeader = () => {
  return (
    <div className={`w-full ${styles.horizontalPadding}`}>
      <div className="w-full py-5 flex flex-col gap-y-8">
        <div className="w-full flex justify-between items-center md:pr-2">
          <p className="font-normal text-sm">Home {">"} Tours</p>
          <p className="font-normal text-sm">
            THE 10 BEST Phuket Tours & Excursions
          </p>
        </div>
        <h1 className="text-4xl font-bold">
          Explore all things to do in Phuket
        </h1>
      </div>
    </div>
  );
};

export default CommonHeader;
