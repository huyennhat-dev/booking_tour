/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Layout from "../Layout";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const MyTour = lazy(() => import("../pages/MyTour"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
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
    title: "My Profile Page",
    url: "/profile",
    page: <Layout page={<Profile />} />,
  },
  {
    title: "My Profile Page",
    url: "/mytour",
    page: <Layout page={<MyTour />} />,
  },
  {
    title: "Tours Page",
    url: "/tours",
    page: <Layout page={<Tours />} />,
  },
  {
    title: "Tour Details Page",
    url: "/tours/:tour_slug",
    page: <Layout page={<TourDetails />} />,
  },
  {
    title: "Tour Booking Page",
    url: "/booking/:tourId",
    page: <Layout page={<BookingPage />} />,
  },
  {
    title: "Tour Payment Status Page",
    url: "/payment",
    page: <Layout page={<PaymentStatusPage />} />,
  },

  {
    title: "Contact",
    url: "/contact",
    page: <Layout page={<ContactUs />} />,
  },

  {
    title: "Tour NotFound Page",
    url: "*",
    page: <Layout page={<NotFoundPage />} />,
  },
];
