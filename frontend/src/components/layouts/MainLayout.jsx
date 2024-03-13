import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/index.js';
import { appPaths } from '../../routes/routes.js';

const MainLayout = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Navigate to={appPaths.chatPagePath()} />
      : <Outlet />
  );
};

export default MainLayout;
