import React, { useState } from "react";
import Popup from "../components/global/LoginPopup";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <Popup />

      {showModal && (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-500">
          <div className="logout-overlay w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-500 bg-slate-50 opacity-[0.2]">
            <div className="absolute center-div w-[360px] h-[360px] bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
