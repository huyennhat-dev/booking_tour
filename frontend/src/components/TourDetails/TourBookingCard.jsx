import React from "react";
import Button from "../global/Button";
import { styles } from "../../styles/styles";
import { GiCheckMark } from "react-icons/gi";
const TourBookingCard = ({
  tourGuide,
  meal,
  insurance,
  price,
  promotional,
  departure_day,
  end_tour_day,
  handleBooking
}) => {

  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0 h-[410px]">
      <p className="text-base">
        Giá gốc:
        <span className="ml-2 font-medium line-through text-gray-600 italic">
          {price} đ
        </span>
      </p>
      <p className="text-base">
        Khuyến mãi:
        <span className={`${styles.orangeText} ml-2 font-semibold text-[24px]`}>
          {promotional * 100} %
        </span>
      </p>
      <p className="text-base">
        Giá mới chỉ:
        <span className={`${styles.orangeText} ml-2 font-semibold text-[29px]`}>
          {price - price * promotional} đ
        </span>
      </p>
      {tourGuide || meal || insurance ? (
        <div>
          <p className="text-base font-medium">Quyền lợi</p>
          {tourGuide && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Hướng dẫn viên nhiệt tình
                </label>
              </div>
            </div>
          )}
          {meal && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Ăn uống trọn gói
                </label>
              </div>
            </div>
          )}
          {insurance && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Bảo hiểm chuyến đi
                </label>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm">Ngày khởi hành: </p>
        <div className="text-sm flex items-center gap-2 md:gap-4">
          <p className="text-sm">{departure_day}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Ngày kết thúc: </p>
        <div className="text-sm flex items-center gap-2 md:gap-4">
          <p className="text-sm">{end_tour_day}</p>
        </div>
      </div>

      <Button
        title="Đặt Ngay"
        onclick={handleBooking}
        classes={`${styles.bgOrange} w-full py-2 text-base font-medium py-3 my-3 text-white rounded-xl`}
      />
    </div>
  );
};

export default TourBookingCard;
