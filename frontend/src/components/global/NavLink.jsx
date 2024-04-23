import React from "react";
import { Link, Navigate } from "react-router-dom";

const NavLink = ({ path, title, setOpen }) => {
  // const navigate = useNavigate();
  const navigateToLink = (link) => {
    setOpen(false);
    // Navigate(link);
  };
  return (
    // <button
    //   onClick={() => navigateToLink(path)}
    //   className="text-sm font-normal"
    // >
    //   {title}
    // </button>
    <Link to={path}>{title}</Link>
  );
};

export default NavLink;
