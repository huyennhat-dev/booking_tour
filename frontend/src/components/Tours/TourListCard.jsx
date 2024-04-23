import React from "react";
import { TourImag1 } from "../../assets/export";
import { styles } from "../../styles/styles";
import Button from "../global/Button";
import { Link, useNavigate } from "react-router-dom";

const TourListCard = ({ tour }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/tours/${tour?.title}`);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-2 border md:p-3 rounded-xl gap-4">
      <img src={tour?.image} alt="tour image" className="mx-auto md:mx-0" />
      <div className="md:px-2 flex flex-col justify-center items-start gap-2">
        <p className="text-sm font-normal">{tour?.location}</p>
        <p className="text-base font-medium">{tour?.title}</p>
        <p className="text-xs font-normal">4.5 (162)</p>
        <p className="text-sm font-normal">{tour?.desc}</p>
        <div className="w-full flex items-center justify-between">
          <p className={`text-xs ${styles.orangeText}`}>Best Price Guarantee</p>
          <p className={`text-xs ${styles.orangeText}`}>Free Cancelation</p>
        </div>
      </div>
      <div className="md:ps-3 flex flex-col justify-between py-3 items-center gap-5 md:border-l">
        <p className="text-sm font-normal">{tour?.duration}</p>
        <p className="text-base font-medium">From ${tour?.price}</p>
        <Button
          title="View Details"
          onclick={handleNavigate}
          classes={`${styles.orangeText} hover:text-white hover:${styles.bgOrange} transition-all duration-300 rounded-lg border border-[#EB662B] w-full py-2 text-base font-medium`}
        />
        {/* <Link
          to={`/tours/${tour?.title}`}
          classes={`w-full py-3 ${styles.orangeText} text-sm w-full py-2 border border-black`}
        >
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default TourListCard;
