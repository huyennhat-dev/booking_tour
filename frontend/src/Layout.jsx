import React from "react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ page }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">{page}</div>
      <Footer />
    </>
  );
};

export default Layout;
