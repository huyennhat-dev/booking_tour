/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Account = lazy(() => import("../pages/Account"));


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
    }


];
