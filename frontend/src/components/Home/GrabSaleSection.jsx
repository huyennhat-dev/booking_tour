import React from "react";
import { styles } from "../../styles/styles";
import { GrabSaleLeft, GrabSaleRight } from "../../assets/export";
import Button from "../global/Button";

const GrabSaleSection = () => {
  return (
    <div className={`py-4 md:py-16 ${styles.horizontalPadding}`}>
      <div className="w-full md:h-1/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="h-full flex flex-col gap-y-5 justify-center items-start p-6 md:px-12 bg-pink-50 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Tận hưởng giảm giá tới
            <span className="text-[#EB662B] "> 35% </span> tại điểm đến yêu
            thích của bạn
          </h1>
          <p className="text-[#05073C] text-xl px-2">
            Ưu đãi có hạn, đừng bỏ lỡ cơ hội
          </p>
          <Button
            title={"Đặt ngay"}
            classes={`${styles.bgOrange} px-4 py-3 text-white text-lg font-medium rounded-lg mx-2`}
          />
        </div>
        <div className="md:h-1/2 h-full">
          <img
            src="https://heritagevietnamairlines.cdn.vccloud.vn/wp-content/uploads/2022/12/shutterstock_343170872-1024x683.jpg"
            alt=""
            className="rounded-b-xl md:rounded-b-none md:rounded-r-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default GrabSaleSection;
