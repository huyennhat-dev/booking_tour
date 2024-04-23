import DetailPage from "../pages/UserPage/DetailPage";
import HomePage from "../pages/UserPage/HomePage";
import SearchPage from "../pages/UserPage/SearchPage";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/detail/:id",
    component: DetailPage,
  },
];

export { publicRoutes };
