import React from "react";
import { styles } from "../../styles/styles";

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
    <div
      className={` hidden md:block py-16 ${styles.horizontalPadding} flex flex-col gap-y-12`}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Những việc làm phổ biến</h2>
      </div>
      <div className="  w-full grid grid-cols-1 md:grid-cols-9 lg:grid-cols-9 xl:gird-cols-9 grid-rows-1 gap-4 h-[515px]">
        <div className="col-span-2 row-span-1 flex flex-col gap-4">
          <img
            src={PopularThing1}
            alt=""
            className="h-[50%]  rounded-md object-cover"
          />
          <img
            src={PopularThing2}
            alt=""
            className="h-[50%] rounded-md object-cover"
          />
        </div>
        <div className="col-span-3">
          <img
            src={PopularThing3}
            alt=""
            className="w-full h-full object-cover rounded-md mx-auto"
          />
        </div>
        <div className="col-span-4  row-span-1 flex flex-col gap-4">
          <div className=" h-[50%]">
            <img
              src={PopularThing4}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between gap-4 h-[47%]">
            <img
              src={PopularThing5}
              alt=""
              className=" w-[40%] object-cover rounded-md"
            />
            <img
              src={PopularThing6}
              alt=""
              className=" w-[60%]  object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularThingsToDoSection;
