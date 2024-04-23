import React from "react";

const Button = ({ title, classes, onclick }) => {
  return (
    <button onClick={onclick} className={classes}>
      {title}
    </button>
  );
};

export default Button;
