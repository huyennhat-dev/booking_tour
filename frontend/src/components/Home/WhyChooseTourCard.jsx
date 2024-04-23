import React from "react";

const WhyChooseTourCard = ({ tour }) => {
  return (
    <div className="py-2 px-3 flex flex-col items-start gap-y-4">
      <img src={tour?.image} alt="" className="h-12 w-12" />
      <p className="text-lg font-bold">{tour?.title}</p>
      <p className="text-sm font-normal text-[#05073C]">{tour?.description}</p>
    </div>
  );
};

export default WhyChooseTourCard;
