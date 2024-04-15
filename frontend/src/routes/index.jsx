import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route index element={<HomePage />} />
    </Routes>
  );
};

export default RouterPage;
