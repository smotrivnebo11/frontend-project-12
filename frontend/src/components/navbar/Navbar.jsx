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
      : null
  );
};

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to={appPaths.chatPagePath()}>{t('pages.name')}</Navbar.Brand>
        <AuthButton />
      </div>
    </Navbar>
  );
};

export default NavBar;
