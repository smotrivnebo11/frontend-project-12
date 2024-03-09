/* eslint-disable no-lone-blocks */
import React from 'react';
import { ToastContainer } from 'react-toastify';
// import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import useAuth from '../hooks/index.js';
import { appPaths } from '../routes/routes.js';

import AuthProvider from '../contexts/AuthProvider.jsx';
import NavBar from './navbar/Navbar.jsx';
import { SignUpPage } from './pages/SignUpPage/index.js';
import { LoginPage } from './pages/LoginPage/index.js';
import { ChatPage } from './pages/ChatPage/index.js';
import { NotFoundPage } from './pages/NotFoundPage/index.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn
    ? children
    : <Navigate to={appPaths.loginPagePath()} state={{ from: location }} />;
};

// const AuthButton = () => {
//   const auth = useAuth();
//   const { t } = useTranslation();

//   return auth.loggedIn
//     ? <Button onClick={auth.logOut}>{t('exit')}</Button>
//     : null;
// };

const App = () => {
  { /* const { t } = useTranslation(); */ }

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>

          {/* <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to={appPaths.chatPagePath()}>{t('name')}</Navbar.Brand>
              <AuthButton />
            </Container> */}
          {/* </NavBar> */}
          <NavBar />

          <ToastContainer />

          <Routes>
            <Route
              path={appPaths.chatPagePath()}
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
            <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
            <Route path={appPaths.notFoundPath()} element={<NotFoundPage />} />
          </Routes>

        </Router>
      </div>
    </AuthProvider>
  );
};

// const PrivateRoute = ({ children }) => {
//   const auth = useAuth();
//   return auth.user ? children : <Navigate to={appPaths.loginPagePath()} />;
// };

// const App = () => (

//   <BrowserRouter>
//     <div className="d-flex flex-column h-100">
//       <ToastContainer />
//       <NavBar />

//       <Routes>
//         <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
//         <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
//         <Route
//           path={appPaths.chatPagePath()}
//           element={(
//             <PrivateRoute>
//               <ChatPage />
//             </PrivateRoute>
//           )}
//         />
//         <Route path={appPaths.notFoundPath()} element={<NotFoundPage />} />
//       </Routes>

//     </div>
//   </BrowserRouter>
// );

export default App;
