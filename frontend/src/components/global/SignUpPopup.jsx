import React, { useState } from "react";
import { styles } from "../../styles/styles";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoogleLogo } from "../../assets/export";

const SignUpPopup = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="">
      <button onClick={handleToggle} className={`font-normal`}>
        Sign Up
      </button>

      {showModal && (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-40 transition-all duration-500">
          <div
            className="logout-overlay w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-500 bg-[#303d438c]"
            onClick={handleToggle}
          ></div>
          <div className="absolute center-div w-4/5 md:w-2/5 min-h-[360px] bg-white z-50 box_shadow transition-all duration-500 flex flex-col gap-y-5 py-10 px-4 md:px-10 rounded-xl">
            <div className="absolute top-4 right-4">
              <IoClose
                className="text-xl cursor-pointer"
                onClick={handleToggle}
              />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-semibold">Create an account</h3>
            </div>
            <div className="w-full">
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none"
                placeholder="Enter your Name"
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none"
                placeholder="Create a password"
              />
            </div>
            {/* <div className="w-full py-0 text-right">
              <Link className="text-sm">Forgot Password?</Link>
            </div> */}
            <div className="w-full py-0 my-0">
              <button
                className={`w-full py-3 text-white text-sm font-medium rounded-xl ${styles.bgOrange}`}
              >
                Sign Up
              </button>
            </div>
            <div className="w-full flex items-center justify-center md:px-1">
              <div className="border w-full border-slate-200"></div>
              <div className="w-full text-center">
                <p className="text-sm">Or sign up with</p>
              </div>
              <div className="border w-full border-slate-200"></div>
            </div>
            <div className="w-full">
              <button
                className={`w-full py-3 text-sm font-medium rounded-xl border border-slate-200 flex items-center justify-center gap-x-3`}
              >
                <img src={GoogleLogo} alt="" className="w-5 h-5" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPopup;
