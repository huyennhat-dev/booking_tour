/* eslint-disable react/prop-types */
import React from "react";

const ButtonComponent = (props) => {
  const { onClick, text, disabled, className } = props;
  const buttonClasses = `px-3 py-1 rounded-md border-[1.5px] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] duration-100 ease-in-out text-white ${className}`;
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || false}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
