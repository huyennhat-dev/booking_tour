import React, { useEffect } from "react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { getToken } from "./utils/tokenUtils";
import { useDispatch } from "react-redux";
import { logout, setToken } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";

const Layout = ({ page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) dispatch(setToken({ token }));
    if (!token) dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Navbar />
      <div className="w-full">{page}</div>
      <Footer />
    </>
  );
};

export default Layout;
