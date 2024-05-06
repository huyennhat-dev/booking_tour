import React, { startTransition, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo.svg';
import { ArrowDownIcon, CalendarIcon, DashboardIcon, UserIcon } from '../Icon';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (userInfo?.role) {
      setRole(userInfo.role);
    }
  }, [userInfo]);



  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const navigate = useNavigate();
  const handleClickNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <div className="w-full text-center">
            <div className="w-full flex items-center">
              <img src="./logo.png" alt="" className=" mx-2" />
              <p className="text-3xl text-[color:#EB662B] font-bold">VTour</p>
            </div>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>


            <ul className="mb-6 flex flex-col gap-1.5">

              {role == "admin" && <li onClick={() => handleClickNavigate('/')} >
                <div
                  className={`group cursor-pointer relative flex items-center  gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                    pathname == 'dashboard') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  {DashboardIcon}
                  Dashboard
                </div>
              </li>}
              <li onClick={() => handleClickNavigate('/calendar')} >
                <div
                  className={`group cursor-pointer relative flex items-center  gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                    pathname == '/calendar') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  {CalendarIcon}
                  Lịch làm việc
                </div>
              </li>

              {role == "staff" && <li onClick={() => handleClickNavigate('/tour/staff')} >
                <div
                  className={`group cursor-pointer relative flex items-center  gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                    pathname == '/tour/staff') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  {CalendarIcon}
                  Tour bạn hướng dẫn
                </div>
              </li>}

              {(role == "admin" || role == "manager") && <SidebarLinkGroup
                activeCondition={
                  pathname.includes('/account')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/account/manager' ||
                          pathname == '/account/user') &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {UserIcon}
                        Tài khoản
                        {ArrowDownIcon(open)}
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li onClick={() => handleClickNavigate('/account/manager')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname === "/account/manager") &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Tài khoản {role == "admin" ? "đối tác" : "hướng dẫn viên"}
                            </div>
                          </li>

                          {role == "admin" && <li onClick={() => handleClickNavigate('/account/user')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname == '/account/user') &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Tài khoản người dùng
                            </div>
                          </li>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}


              {(role == "admin" || role == "manager") && <SidebarLinkGroup
                activeCondition={
                  pathname.includes('/tour') || pathname.includes('/tour/create')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                          pathname == 'dashboard') &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {DashboardIcon}
                        Tour
                        {ArrowDownIcon(open)}
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li onClick={() => handleClickNavigate('/tour')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname === "/tour") &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Danh sách tour
                            </div>
                          </li>

                          <li onClick={() => handleClickNavigate('/tour/exp')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname === "/tour/exp") &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Danh sách tour quá hạn
                            </div>
                          </li>


                          {role == "manager" && <li onClick={() => handleClickNavigate('/tour/create')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname == '/tour/create') &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Tạo mới tour
                            </div>
                          </li>}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}

              {(role == "admin" || role == "manager") && <SidebarLinkGroup
                activeCondition={
                  pathname.includes('/book')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/book' ||
                          pathname == '/book/cancel') &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {UserIcon}
                        Quản lí đặt tour
                        {ArrowDownIcon(open)}
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li onClick={() => handleClickNavigate('/book')}
                          >
                            <div
                              className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                pathname === "/book") &&
                                'bg-graydark dark:bg-meta-4'
                                }`}
                            >
                              Danh sách tuor đặt
                            </div>
                          </li>

                          {
                            role == "admin" && <li onClick={() => handleClickNavigate('/book/cancel')}
                            >
                              <div
                                className={`group cursor-pointer relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                  pathname === "/book/cancel") &&
                                  'bg-graydark dark:bg-meta-4'
                                  }`}
                              >
                                Danh sách tour hủy
                              </div>
                            </li>
                          }
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>}

            </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
