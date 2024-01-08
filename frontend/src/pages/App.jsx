/* eslint-disable functional/no-expression-statements */
import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/auth.jsx';
import routes from '../routes.js';
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { NotFound } from './NotFound';
// import { SignUpPage } from './SignUp/SignUp';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const memoAuth = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoAuth}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn
    ? children
    : <Navigate to="/login" state={{ from: location }} />;
};

const AuthButton = () => {
  const auth = useAuth();

  return auth.loggedIn
    ? <Button onClick={auth.logOut}>Выйти</Button>
    : '';
};

// eslint-disable-next-line arrow-body-style
const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>

          <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">{t('name')}</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>

          <Routes>
            <Route
              path={routes.chatPagePath()}
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
