import { useState } from "react";
import StarIcon from "../assets/icons/star.svg";
/* eslint-disable react/prop-types */
const TourCard = (props) => {
  const { img, title, desc, rate, price, sale, departurePoin, date } =
    props.data;
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
      <div className="rounded-md ">
        <img
          src={img}
          alt={title}
          title={title}
          className="w-[100%] rounded-t-md"
        />
        <div className="p-3">
          <h6>{title}</h6>
          <div className="flex">{elements}</div>
          <p>{desc}</p>
          <p>Nơi khởi hành: {departurePoin}</p>
          <p>Ngày khởi hành: {date}</p>
          <p>Giá gốc: {price}</p>
          <p>
            <span>{price - price * sale}</span>
            <span>Giảm {sale * 100} %</span>
          </p>
          <div className="w-[100%] flex justify-center">
            <button
              className={`w-[90%] border-[1px] border-red-600 py-1 mx-auto rounded  duration-100 ${
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
