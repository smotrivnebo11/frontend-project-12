/* eslint-disable functional/no-expression-statements */
import React, { useMemo, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes/routes.js';

import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userdata');
    setLoggedIn(false);
  };

  const memoizedValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to={routes.mainPagePath()}>Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            path={routes.mainPagePath()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.notFoundPath()} element={<NotFound />} />
          <Route path={routes.signupPagePath()} element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export { AuthProvider };
export default App;
