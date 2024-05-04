/* eslint-disable no-unused-vars */
import React, { startTransition, useState } from "react";
import { HeroImage, HomeBg } from "../../assets/export";
// import Main from "../../assets/export";
import Button from "../global//Button";
import { styles } from "../../styles/styles";
import provinces from "../../_mock/province";
import appData from "../../_mock/appData";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState(provinces[0].slug);
  const [departureDay, setDepartureDay] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSearchClick = () => {
    startTransition(() => {
      navigate(
        `/tours?destination=${destination}&departure_day=${departureDay}`
      );
    });
  };

  return (
    <div
      className={`w-full h-[600px] relative  mt-2`}
    >
      <img
        src={HomeBg}
        alt=""
        className="w-full h-full"
      />
      <div className="w-full absolute px-4 md:px-28 text-center bottom-10 translate-x-[0%] flex flex-col items-center gap-y-3">
        <div className="flex flex-col md:gap-y-6 lg:gap-y-10 mb-48">
          <h1 className="text-4xl md:text-5xl lg:text-[69px] font-semibold text-white">
            {appData.slogan}
          </h1>
          {/* <p className="text-white text-base font-medium mb-6 ">
            Từ những cuộc trốn chạy ở địa phương đến những cuộc phiêu lưu xa
            xôi, hãy tìm điều khiến bạn hạnh phúc mọi lúc, mọi nơi!
          </p> */}
        </div>

        <div className="bg-white rounded-lg w-[90%] lg:w-[800px] flex flex-col gap-y-2 md:flex-row items-center justify-between p-3 gap-x-3">
          <div className="border rounded-lg h-full w-[100%] md:w-[45%]">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-full w-full text-sm px-3 text-slate-700 outline-none py-4"
            >
              <option
                disabled
                style={{ backgroundColor: "#f57a45", color: "white" }}
              >
                Chọn nơi bạn muốn đến
              </option>
              {provinces.map((province, index) => (
                <option key={index} value={province.slug}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="border rounded-lg h-full w-[100%] md:w-[45%]">
            <input
              type="date"
              value={departureDay}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDepartureDay(e.target.value)}
              className="h-full w-full text-sm px-3 text-slate-700 outline-none py-4"
              placeholder="When"
            />
          </div>
          <Button
            title={"Bắt Đầu"}
            classes={
              "tex-sm font-normal text-white h-full w-[100%] md:w-[83px] rounded-lg bg-[#EB662B] outline-none hover:bg-[#ea713e] transition-all duration-300 py-4"
            }
            onclick={handleSearchClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
