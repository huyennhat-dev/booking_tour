import React from "react";
import { styles } from "../../styles/styles";
import { Logo } from "../../assets/export";

const SplashPage = () => {
  return (
    <div className={`w-screen h-screen flex justify-center items-center`}>
      <img src={Logo} alt="" className="" />
    </div>
  );
};

export default SplashPage;
