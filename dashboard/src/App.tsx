import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import { routes } from './routes';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {
          routes.map((route) => (
            <Route
              key={route.url}
              path={route.url}
              element={
                <>
                  <PageTitle title={route.pageTitle} />
                  {route.page}
                </>
              }
            />
          ))
        }

      </Routes>
    </>
  );
}

export default App;
