import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { Suspense } from "react";
import SplashPage from "./components/global/SplashPage";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tabs/style/react-tabs.css';
import "./App.css";


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
