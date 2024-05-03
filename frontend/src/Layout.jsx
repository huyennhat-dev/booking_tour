import React, { useEffect } from "react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { getToken } from "./utils/tokenUtils";
import { useDispatch } from "react-redux";
import { logout, setToken } from "./redux/authSlice";

const Layout = ({ page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) dispatch(setToken({ token }));
    if(!token)  dispatch(logout())
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full">{page}</div>
      <Footer />
    </>
  );
};

export default Layout;
