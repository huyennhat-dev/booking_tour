import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useDispatch } from 'react-redux';
import { getToken } from '../utils/tokenUtils';
import { logout, setToken } from '../redux/feature/authSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (token) dispatch(setToken({ token }))
    if (!token) {
      dispatch(logout())
      navigate('/login')
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <ToastContainer autoClose={2000} />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
