/* eslint-disable react/prop-types */
import "./logo.css";
import logo_img from "../../../assets/images/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img
        className="rounded-xl w-[60px] cursor-pointer"
        src={logo_img}
        alt="Việt Nam Booking Tour"
      />
      <p className="logo-text ml-2 text-[26px] text-[color:var(--color-primary)] font-bold ">
        Booking Tour
      </p>
    </div>
  );
};

export default Logo;
