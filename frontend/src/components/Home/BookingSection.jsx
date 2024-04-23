import React from "react";
import { styles } from "../../styles/styles";
import { GetPercentOff, GetPercentOffBg } from "../../assets/export";
import Button from "../global/Button";

const BookingSection = () => {
  return (
    <div
      className={`py-16 ${styles.horizontalPadding} flex flex-col gap-y-12 relative`}
    >
      <img src={GetPercentOffBg} alt="" className="" />
      <div className="absolute top-36 left-40 md:w-[365px] lg:w-[365px] xl:w-[365px] flex flex-col gap-y-5">
        <h2 className="text-white text-4xl font-bold">
          Get 5% off your 1st app booking
        </h2>
        <p className="text-white text-sm font-normal">
          Booking's better on the app. Use promo code "TourBooking" to save!
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-white text-base font-medium">
            Get a magic link sent to your email
          </label>
          <div className="w-full flex items-center justify-between gap-2 h-[50px]">
            <input
              type="email"
              className="bg-white rounded-lg px-3 h-full outline-none text-sm w-full"
              placeholder="Enter Your Address"
            />
            <Button
              title={"Send"}
              classes={`bg-white h-full px-4 rounded-lg text-sm font-medium hover:bg-[#EB662B] hover:text-white transition-all duration-300`}
            />
          </div>
        </div>
      </div>
      <img
        src={GetPercentOff}
        alt=""
        className="absolute w-[8rem] right-12 md:w-[20rem] lg:w-[29rem] lg:right-40 bottom-16"
      />
    </div>
  );
};

export default BookingSection;
