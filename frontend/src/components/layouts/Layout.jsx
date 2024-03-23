import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// import { useAuth } from '../../hooks/index.js';
// import { appPaths } from '../../routes/routes.js';
import NavBar from '../navbar/Navbar.jsx';

const Layout = () => (
// const auth = useAuth();
  // auth.user
  //   ? <Navigate to={appPaths.chatPagePath()} />
  //   : <Outlet />
  <>
    <NavBar />
    <Outlet />
  </>
);
export default Layout;
