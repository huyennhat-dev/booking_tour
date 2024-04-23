import React from "react";
import { styles } from "../../styles/styles";
import { customercomments } from "../../constants/customercomments";

const ReviewsSection = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className={`${styles.blueText} text-2xl font-bold`}>
        Customer Reviews
      </h1>
      {customercomments.map((review, index) => {
        return (
          <div
            className="flex flex-col justify-start items-start gap-y-4"
            key={index}
          >
            <div className="flex items-center justify-start gap-3">
              <div className="w-8 h-8 bg-[#05073C] rounded-full"></div>
              <p className="text-base font-semibold">{review?.author}</p>
            </div>
            <div>
              <p className="text-base font-medium">{review?.review}</p>
              <p className="text-sm font-normal ps-1">{review?.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsSection;
