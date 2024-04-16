import { useState } from "react";
import StarIcon from "../../assets/icons/star.svg";
/* eslint-disable react/prop-types */
const TourCard = (props) => {
  const { img, title, rate, price, sale, departurePoin, date } = props.data;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 100);
  };

  const elements = [];
  for (let i = 1; i <= rate; i++) {
    elements.push(<img key={i} src={StarIcon} />);
  }
  return (
    <>
      <div className="rounded-md border-[1px] shadow-custom">
        <img
          src={img}
          alt={title}
          title={title}
          className="w-[100%] rounded-t-md"
        />
        <div className="p-3">
          <h6 className="font-bold text-[20px] text-wrap truncate overflow-hidden line-clamp-2 title ">
            {title}
          </h6>
          <div className="flex my-2">{elements}</div>
          <p className="font-normal text-[16px]">
            Nơi khởi hành: {departurePoin}
          </p>
          <p className="font-normal text-[16px]">Ngày khởi hành: {date}</p>
          <p className="font-normal text-[16px]">
            Giá gốc:{" "}
            <span className="ml-2 font-medium text-[16px] line-through">
              {price} đ
            </span>
          </p>
          <p className="my-2 flex justify-between px-2 items-center">
            <span className="text-[22px] text-[color:var(--color-primary)] font-semibold">
              {price - price * sale} đ
            </span>
            <span className="font-medium">Giảm {sale * 100} %</span>
          </p>
          <div className="w-[100%] flex justify-center">
            <button
              className={`font-semibold w-[90%] border-[1.5px] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] ease-in-out hover:text-white py-1 mx-auto rounded  duration-100 ${
                isClicked ? "scale-95" : "scale-100"
              }`}
              onClick={handleClick}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourCard;
