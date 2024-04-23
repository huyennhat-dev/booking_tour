import React, { useRef, useState } from "react";
import { styles } from "../../styles/styles";
import { Logo } from "../../assets/export";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = (e) => {
    if (!sidebarRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`w-full h-20 ${styles.horizontalPadding} flex justify-between items-center py-2`}
    >
      <div>
        <Link to="/">
          <img src={Logo} alt="" className="w-[167px] h-[32px]" />
        </Link>
      </div>
      <div
        className="hidden md:flex items-center justify-end gap-12"
        id="navbar"
      >
        <NavLink path={"/"} title={"Home"} />
        <NavLink path={"/tours"} title={"Find Tours"} />
        <SignUpPopup />
        <LoginPopup />
      </div>
      <div
        onClick={toggleSidebar}
        className={`w-screen h-screen fixed top-0 right-0 transition-all duration-300 flex justify-end items-start z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          ref={sidebarRef}
          className=" flex flex-col justify-start gap-y-6 items-start px-4 pt-6 w-1/2 h-[calc(100vh)] shadow-md z-50 bg-white"
        >
          <div>
            <img src={Logo} alt="" className="w-3/5" />
          </div>
          <div className="flex flex-col gap-y-3">
            <NavLink path={"/"} title={"Home"} setOpen={setOpen} />
            <NavLink path={"/tours"} title={"Find Tours"} setOpen={setOpen} />
            <SignUpPopup />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-3 md:hidden">
        <LoginPopup />
        <button onClick={() => setOpen(true)} className="md:hidden">
          <TbMenuDeep className="text-2xl md:hidden" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
