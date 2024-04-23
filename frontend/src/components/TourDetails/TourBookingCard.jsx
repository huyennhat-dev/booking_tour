import React from "react";
import Button from "../global/Button";
import { styles } from "../../styles/styles";

const TourBookingCard = () => {
  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-6 px-4 md:p-6 py-4  md:h-[42rem] lg:h-[35rem] mt-8 md:mt-0">
      <p className="text-base">
        From <span className="font-medium">$1,400</span>
      </p>
      <p className="text-base font-medium">Tickets</p>
      <div className="flex items-center justify-between">
        <p className="text-sm">Adult (18+ years) $282.00</p>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            -
          </button>
          <span>1</span>
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            +
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Youth (13-17 years) $168.00</p>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            -
          </button>
          <span>1</span>
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            +
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Children (0-12 years) $80.00</p>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            -
          </button>
          <span>1</span>
          <button className="border rounded-full w-5 h-5 flex items-center justify-center text-slate-400">
            +
          </button>
        </div>
      </div>

      <p className="text-base font-medium">Add Extra</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="" className="accent-[#EB662B]" />
          <label htmlFor="" className="text-sm">
            Add Service per booking
          </label>
        </div>
        <p className="text-sm">$40</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" name="" id="" className="accent-[#EB662B]" />
          <label htmlFor="" className="text-sm">
            Add Service per person
          </label>
        </div>
        <p className="text-sm">$40</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Total:</p>
        <p className="text-base font-medium">$1,300</p>
      </div>
      <Button
        title="Book Now"
        classes={`${styles.bgOrange} w-full py-2 text-base font-medium py-3 text-white rounded-xl`}
      />
    </div>
  );
};

export default TourBookingCard;
