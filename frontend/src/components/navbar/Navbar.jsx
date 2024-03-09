import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { appPaths } from '../../routes/routes.js';
import useAuth from '../../hooks/index.js';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const AuthButton = () => auth.user && <Button className="btn-primary" onClick={auth.logOut}>{t('exit')}</Button>;

  return (
    <>
       <Navbar bg="white" expand="lg" className="shadow-sm">
         <Container>
           <Navbar.Brand as={Link} to={appPaths.chatPagePath()} className="navbar-brand">{t('name')}</Navbar.Brand>
           <AuthButton />
         </Container>
       </Navbar>
       <Outlet />
     </>
  // <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
  //   <div className="nav-container">
  //     <NavLink to={appPaths.chatPagePath()} className="navbar-brand">
  //       {t('name')}
  //     </NavLink>
  //     <AuthButton/>
  //   </div>
  // </nav>
  );
};

export default NavBar;
