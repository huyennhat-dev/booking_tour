import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { popularthings } from "../../constants/whychoosetours";
import {
  PopularThing1,
  PopularThing2,
  PopularThing3,
  PopularThing4,
  PopularThing5,
  PopularThing6,
} from "../../assets/export";

const PopularThingsToDoSection = () => {
  return (
    <div className={`py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}>
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Popular things to do</h2>
        <Link to="/" className="text-sm font-normal">
          See All
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-9 lg:grid-cols-9 xl:gird-cols-9 grid-rows-1 gap-4">
        <div className="col-span-2 row-span-1 flex flex-col gap-4">
          <img
            src={PopularThing1}
            alt=""
            className="h-[225px] mx-auto md:mx-0"
          />
          <img
            src={PopularThing2}
            alt=""
            className="h-[220px] mx-auto md:mx-0"
          />
        </div>
        {/* <div className="col-span-1 row-span-1"></div> */}
        <div className="col-span-3">
          <img src={PopularThing3} alt="" className="w-[390px] mx-auto" />
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <div className="col-span-4 row-span-1">
            <img src={PopularThing4} alt="" className="w-full" />
          </div>
          <div className="row-span-1 col-span-4 flex justify-between gap-4">
            <img src={PopularThing5} alt="" className="h-[215px] w-2/5" />
            <img
              src={PopularThing6}
              alt=""
              className="h-[215px] w-[195px] md:w-3/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularThingsToDoSection;
