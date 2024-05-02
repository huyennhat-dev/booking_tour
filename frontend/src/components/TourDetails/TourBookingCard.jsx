import React from "react";
import Button from "../global/Button";
import { styles } from "../../styles/styles";
import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const TourBookingCard = ({
  tourGuide,
  meal,
  insurance,
  price,
  promotional,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/booking/1`);
  };
  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0">
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
                  Có hướng dẫn viên
                </label>
              </div>
            </div>
          )}
          {meal && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Có ăn theo bữa
                </label>
              </div>
            </div>
          )}
          {insurance && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Được trang bị bảo hiểm đầy đủ
                </label>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm">Chọn ngày khởi hành: </p>
        <div className="flex items-center gap-2 md:gap-4">
          <input
            type="date"
            className="h-full w-full text-sm px-3 text-slate-700 outline-none py-2 border-b-[1px] border-b-[color:#EB662B]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Số hành khách: </p>
        <div className="flex items-center gap-2 md:gap-4">
          <input
            type="number"
            min={1}
            max={15}
            className="h-full w-full text-sm px-3 border-[1px] border-[color:#EB662B] rounded-md text-slate-700 outline-none py-2 text-center"
          />
        </div>
      </div>
    
      <Button
        title="Đặt Ngay"
        onclick={handleNavigate}
        classes={`${styles.bgOrange} w-full py-2 text-base font-medium py-3 my-3 text-white rounded-xl`}
      />
    </div>
  );
};

export default TourBookingCard;
