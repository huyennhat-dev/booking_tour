import React from "react";
import { HeroImage } from "../../assets/export";
// import Main from "../../assets/export";
import Button from "../global//Button";
import { styles } from "../../styles/styles";

const Hero = () => {
  return (
    <div className={`w-full h-screen relative ${styles.horizontalPadding}`}>
      <img src={HeroImage} alt="" className="w-full h-full rounded-2xl" />
      <div className="w-full absolute px-4 md:px-28 text-center center-div flex flex-col items-center gap-y-3">
        <div className="flex flex-col md:gap-y-6 lg:gap-y-10">
          <h1 className="text-4xl md:text-5xl lg:text-[69px] font-semibold text-white">
            Your World of Joy
          </h1>
          <p className="text-white text-base font-medium mb-6">
            From local escapes to far-flung adventures, find what makes you
            happy anytime, anywhere
          </p>
        </div>
        <div className="bg-white rounded-lg w-[90%] lg:w-[800px] flex flex-col gap-y-2 md:flex-row items-center justify-between p-3 gap-x-3">
          <div className="border rounded-lg h-full w-[100%] md:w-[45%]">
            <input
              type="text"
              className="h-full w-full text-sm px-3 text-slate-400 outline-none py-4"
              placeholder="Where"
            />
          </div>
          <div className="border rounded-lg h-full w-[100%] md:w-[45%]">
            <input
              type="date"
              className="h-full w-full text-sm px-3 text-slate-400 outline-none py-4"
              placeholder="When"
            />
          </div>
          <Button
            title={"Search"}
            classes={
              "tex-sm font-normal text-white h-full w-[100%] md:w-[83px] rounded-lg bg-[#EB662B] outline-none hover:bg-[#ea713e] transition-all duration-300 py-4"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
