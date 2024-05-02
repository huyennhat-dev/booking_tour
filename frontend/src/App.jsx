import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes";
import { Suspense } from "react";
import SplashPage from "./components/global/SplashPage";

function App() {
  return (
    <Suspense fallback={<SplashPage />}>
      <Routes>
        {routes.map((route) => {
          return (
            <Route path={route.url} element={route.page} key={route.url} />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
