import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const AccountUser = lazy(() => import("../pages/Account/User"));
const AccountManager = lazy(() => import("../pages/Account/Manager"));
const ListTours = lazy(() => import("../pages/Tour/index"));
const StaffTours = lazy(() => import("../pages/Tour/staffTour"));
const ExpListTours = lazy(() => import("../pages/Tour/ExpTour"));
const CreateTour = lazy(() => import("../pages/Tour/create"));
const EditTour = lazy(() => import("../pages/Tour/edit"));
const ViewTour = lazy(() => import("../pages/Tour/view"));
const StaffViewTour = lazy(() => import("../pages/Tour/StaffView"));
const LoginPage = lazy(() => import("../pages/Auth/Login"));
const ProfilePage = lazy(() => import("../pages/Auth/Profile"));
const CancelTour = lazy(() => import("../pages/Book/cancel"));
const BooksTour = lazy(() => import("../pages/Book"));
const Calendar = lazy(() => import("../pages/Calendar/Calendar"));



export const routes = [
    {

        pageTitle: " Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/dashboard",
        page: <Dashboard />,
    },
    {
        pageTitle: " Account | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/account/manager",
        page: <AccountManager />,
    },
    {
        pageTitle: " Account | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/account/user",
        page: <AccountUser />,
    },

    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour",
        page: <ListTours />,
    },
    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/exp",
        page: <ExpListTours />,
    },
    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/staff",
        page: <StaffTours />,
    },
    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/staff/view/:id",
        page: <StaffViewTour />,
    },
    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/view/:id",
        page: <ViewTour />,
    },

    {
        pageTitle: " Create tour | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/create",
        page: <CreateTour />,
    },
    {
        pageTitle: " Edit Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour/edit/:id",
        page: <EditTour />,
    },

    {
        pageTitle: " Booking | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/book",
        page: <BooksTour />,
    },
    {
        pageTitle: " Cancel Booking | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/book/cancel",
        page: <CancelTour />,
    },

    {
        pageTitle: " Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/calendar",
        page: <Calendar />,
    },

    {
        pageTitle: " Login Page | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/login",
        page: <LoginPage />,
    },

    {
        pageTitle: " Profile Page | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/profile",
        page: <ProfilePage />,
    },
    
    {
        url: '/',
        pageTitle: " Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template",
        page: <Navigate to="/dashboard" replace />
    }


];
