import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const UserInfo = ({data}) => {
  const dispatch = useDispatch();


  const handleLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div className="group relative px-5">
      <div className="flex items-center">
        <img
          src={data.avatar}
          alt=""
          className="w-[28px] h-[28px] mr-2"
        />
        <p className="font-medium text-base">{data.fullName}</p>
      </div>

      <div className="info-menu absolute bottom-[-115px] left-0 w-full bg-white/80 z-50 p-3 rounded scale-0 group-hover:scale-100 duration-100 ease-linear">
        <ul className="text-black">
          <li className="text-black mb-2 hover:text-[color:#EB662B] hover:translate-x-2 duration-300 ease-in-out ">
            <Link to="/profile"> Thông tin cá nhân</Link>
          </li>
          <li className="text-black mb-2 hover:text-[color:#EB662B] hover:translate-x-2 duration-300 ease-in-out">
            <Link to="/mytour"> Tour đã đặt</Link>
          </li>
          <li className="text-black cursor-pointer hover:text-[color:#EB662B] hover:translate-x-2 duration-300 ease-in-out">
            <div onClick={handleLogout}> Đăng xuất</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
