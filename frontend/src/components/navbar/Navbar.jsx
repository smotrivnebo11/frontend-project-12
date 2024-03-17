/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/index.js';
import { appPaths } from '../../routes/routes.js';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.user
      ? <Button onClick={auth.logOut} variant="info">{t('buttons.exit')}</Button>
      // variant="primary"
      // {t('buttons.logOut')}
      : null
  );
};

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to={appPaths.chatPagePath()}>{t('pages.name')}</Navbar.Brand>
        {/* {t('ui.hexletChat')} */}
        <AuthButton />
      </div>
    </Navbar>
  );
};

// import { Container, Navbar, Button } from 'react-bootstrap';
// import { Link, Outlet } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';
// import { appPaths } from '../../routes/routes.js';
// import { useAuth } from '../../hooks/index.js';

// const NavBar = () => {
//   const { t } = useTranslation();
//   const auth = useAuth();

//   const AuthButton = () => auth.user && <Button className="btn-primary" onClick={auth.logOut}>{t('exit')}</Button>;

//   return (
//     <>
//        <Navbar bg="white" expand="lg" className="shadow-sm">
//          <Container>
//            <Navbar.Brand as={Link} to={appPaths.chatPagePath()} className="navbar-brand">{t('name')}</Navbar.Brand>
//            <AuthButton />
//          </Container>
//        </Navbar>
//        <Outlet />
//      </>
//   );
// };

export default NavBar;
