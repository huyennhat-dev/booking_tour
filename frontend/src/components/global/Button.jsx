/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Button = ({ title, classes, onclick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      onclick()
    }, 80);
  };

  return (
    <button
      className={`  ${isClicked ? "scale-95" : "scale-100"} ${classes} duration-75 ease-in-out`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
