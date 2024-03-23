import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { appPaths } from '../routes/routes.js';
import { useAuth } from '../hooks/index.js';

import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import NavBar from './navbar/Navbar.jsx';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />

      <Routes>
        <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
        <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
        <Route
          path={appPaths.chatPagePath()}
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  </BrowserRouter>
);

export default App;
