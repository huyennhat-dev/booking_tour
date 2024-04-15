import BannerImg from "../../assets/images/banner.jpg";
import Form from "./form";

const Banner = () => {
  return (
    <div className="w-[100%] h-[580px] relative">
      <img
        className="w-[100%] h-[320px] object-cover "
        src={BannerImg}
        alt="Việt Nam Booking Tour"
      />
      <Form />
    </div>
  );
};

export default Banner;
