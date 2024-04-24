/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Account = lazy(() => import("../pages/Account"));
const ListTours = lazy(() => import("../pages/Tour/index"));
const CreateTour = lazy(() => import("../pages/Tour/create"));
const EditTour = lazy(() => import("../pages/Tour/edit"));


export const routes = [
    {

        pageTitle: " Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/dashboard",
        page: <Dashboard />,
    },
    {
        pageTitle: " Account | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/account",
        page: <Account />,
    },


    {
        pageTitle: " List Tours | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/tour",
        page: <ListTours />,
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
        url: '/',
        pageTitle: " Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template",
        page: <Navigate to="/dashboard" replace />
    }


];
