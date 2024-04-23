import { lazy } from "react";
import Layout from "../Layout";
// import ContactUs from "../pages/ContactUs";
// import Tours from "../pages/Tours";
// import TourDetails from "../pages/TourDetails";

const Home = lazy(() => import("../pages/Home"));
const Tours = lazy(() => import("../pages/Tours"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const Popup = lazy(() => import("../pages/Modal"));

export const routes = [
  {
    title: "Home Page",
    url: "/",
    page: <Layout page={<Home />} />,
  },
  {
    title: "Tours Page",
    url: "/tours",
    page: <Layout page={<Tours />} />,
  },
  {
    title: "Tour Details Page",
    url: "/tours/:tourname",
    page: <Layout page={<TourDetails />} />,
  },
  {
    title: "Popup Page",
    url: "/popup",
    page: <Layout page={<Popup />} />,
  },
];
