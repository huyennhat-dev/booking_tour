import { lazy } from "react";
import Layout from "../Layout";

const Home = lazy(() => import("../pages/Home"));
const Tours = lazy(() => import("../pages/Tours"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const BookingPage = lazy(() => import("../pages/BookingPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));

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
    url: "/tours/:tourId",
    page: <Layout page={<TourDetails />} />,
  },
  {
    title: "Tour Booking Page",
    url: "/booking/:tourId",
    page: <Layout page={<BookingPage />} />,
  },
  {
    title: "Tour Checkout Page",
    url: "/checkout/:tourId",
    page: <Layout page={<CheckoutPage />} />,
  },

];
