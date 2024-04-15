/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const LocationCard = (props) => {
  const { img, title, view } = props.data;
  return (
    <NavLink to="">
      <div className="">
        <img
          src={img}
          alt={title}
          title={title}
          className="rounded-md hover:scale-105 delay-75 duration-200 mb-1 w-[312px] h-[210px] object-cover"
        />
        <p className="font-bold text-[16px]">{title}</p>
        <p className="font-normal text-[14px]">Đã có {view} lượt khách</p>
      </div>
    </NavLink>
  );
};
export default LocationCard;
