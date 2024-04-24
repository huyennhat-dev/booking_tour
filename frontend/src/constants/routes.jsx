/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Layout from "../Layout";

const Home = lazy(() => import("../pages/Home"));
const Tours = lazy(() => import("../pages/Tours"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const BookingPage = lazy(() => import("../pages/BookingPage"));
const PaymentStatusPage = lazy(() => import("../pages/PaymentStatusPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
    title: "Tour Payment Status Page",
    url: "/payment-status",
    page: <Layout page={<PaymentStatusPage />} />,
  },

  {
    title: "Tour NotFound Page",
    url: "*",
    page: <Layout page={<NotFoundPage />} />,
  },


];
