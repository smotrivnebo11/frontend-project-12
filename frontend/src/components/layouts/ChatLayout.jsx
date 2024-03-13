import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/index.js';
import { appPaths } from '../../routes/routes.js';

const ChatLayout = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Outlet />
      : <Navigate to={appPaths.loginPagePath()} />
  );
};

export default ChatLayout;
