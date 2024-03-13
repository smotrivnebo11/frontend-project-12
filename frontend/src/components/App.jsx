import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChatLayout from './layouts/ChatLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { appPaths } from '../routes/routes.js';

import { SignUpPage } from './pages/SignUpPage/index.js';
import { LoginPage } from './pages/LoginPage/index.js';
import { ChatPage } from './pages/ChatPage/index.js';
import { NotFoundPage } from './pages/NotFoundPage/index.js';

import NavBar from './navbar/Navbar.jsx';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <Router>
        <NavBar />
        <Routes>
          <Route path={appPaths.notFoundPath()} element={<NotFoundPage />} />
          <Route element={<MainLayout />}>
            <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
            <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
          </Route>
          <Route element={<ChatLayout />}>
            <Route path={appPaths.chatPagePath()} element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
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
  </>
);

export default App;
