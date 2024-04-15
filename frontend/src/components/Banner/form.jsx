import LocationIcon from "../../assets/icons/location.svg";
import Profile2UserIcon from "../../assets/icons/profile-2-user.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ProvinceData from "./province.json";
import { useState } from "react";

const Form = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDeparturePoint, setSelectedDeparturePoint] = useState("");

  const handleChangeDestination = (event) => {
    setSelectedDestination(event.target.value);
  };
  const handleChangeDeparturePoint = (event) => {
    setSelectedDeparturePoint(event.target.value);
  };
  return (
    <div className=" absolute top-[200px]  h-[400px] w-[100%] flex justify-center ">
      <div className=" w-[1000px] h-[380px] bg-black/[.1] rounded-[5px] flex justify-center items-center">
        <div className=" w-[900px] h-[280px] bg-white rounded-[5px] p-4 flex items-center">
          <div className="w-[900px]">
            <h3 className=" font-semibold text-[20px] mb-4">
              Việt Nam Booking Tour
            </h3>

            <div className="grid grid-cols-2 gap-4 p-2">
              <div className="">
                <h6 className="text-[14px] font-semibold mb-2">
                  Điểm xuất phát
                </h6>
                <div className="flex items-center border-[1px] border-color: rgb(100 116 139) px-2 py-1 rounded">
                  <img src={LocationIcon} alt="" className="w-[16px]" />
                  <select
                    id="selectedDeparturePoint"
                    value={selectedDeparturePoint}
                    onChange={handleChangeDeparturePoint}
                    className="text-[14px]  w-[100%] border-transparent focus:border-transparent focus:outline-none px-2"
                  >
                    <option value="">Chọn điểm xuất phát của bạn</option>
                    {ProvinceData.map((province, index) => (
                      <option key={index} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="">
                <h6 className="text-[14px] font-semibold mb-2">Điểm đến</h6>
                <div className="flex items-center border-[1px] border-color: rgb(100 116 139) px-2 py-1 rounded">
                  <img src={LocationIcon} alt="" className="w-[16px]" />
                  <select
                    id="selectedDestination"
                    value={selectedDestination}
                    onChange={handleChangeDestination}
                    className="text-[14px]  w-[100%] border-transparent focus:border-transparent focus:outline-none px-2"
                  >
                    <option value="">Chọn nơi bạn muốn đến</option>
                    {ProvinceData.map((province, index) => (
                      <option key={index} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="">
                <h6 className="text-[14px] font-semibold mb-2">
                  Số hành khách
                </h6>
                <div className="flex items-center border-[1px] border-color: rgb(100 116 139) px-2 py-1 rounded">
                  <img src={Profile2UserIcon} alt="" className="w-[16px]" />
                  <input
                    className="text-[14px]  w-[100%] border-transparent focus:border-transparent focus:outline-none px-2"
                    type="number"
                    min={1}
                    placeholder="Nhập số hành khách"
                  />
                </div>
              </div>
              <div className="">
                <h6 className="text-[14px] font-semibold mb-2">
                  Ngày xuất phát
                </h6>
                <div className="cursor-pointer flex items-center border-[1px] border-color: rgb(100 116 139) px-2 py-1 rounded">
                  <img src={CalendarIcon} alt="" className="w-[16px]" />
                  <input
                    className="text-[14px] cursor-pointer  w-[100%] border-transparent focus:border-transparent focus:outline-none px-2"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="w-[100%] flex justify-end px-2 mt-2">
              <button className="right-0 hover:bg-[color:var(--color-primary)] hover:text-white delay-75 duration-300 ease-in-out  border-[1px] border-[color:var(--color-primary)] px-3 py-[2px] rounded">
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
