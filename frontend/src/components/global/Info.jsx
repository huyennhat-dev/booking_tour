import { Link } from "react-router-dom";
import { TrendingDestination2 } from "../../assets/export";

const UserInfo = () => {
  return (
    <div className="group relative px-5">
      <div className="flex items-center">
        <img
          src={TrendingDestination2}
          alt=""
          className="w-[28px] h-[28px] mr-2"
        />
        <p className="font-medium text-base">Huy Hoang</p>
      </div>

      <div className="info-menu absolute bottom-[-90px] left-0 w-full bg-white/80 z-50 p-3 rounded scale-0 group-hover:scale-100 duration-100 ease-linear">
        <ul className="text-black">
          <li className="text-black mb-2 hover:text-[color:#EB662B] hover:translate-x-2 duration-300 ease-in-out ">
            <Link to="/"> Thông tin cá nhân</Link>
          </li>
          <li className="text-black hover:text-[color:#EB662B] hover:translate-x-2 duration-300 ease-in-out">
            <Link to="/"> Tour đã đặt</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
