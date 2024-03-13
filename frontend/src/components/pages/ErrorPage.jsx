import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import { apiRoutes } from '../../routes/routes.js';
import { useAuth } from '../../hooks/index.js';

// import errorImg from '../../assets/error.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const { errorCode, errorMessage } = useSelector((state) => state.channels.error);

  const handleAuthError = () => {
    navigate(apiRoutes.login);
    logOut();
  };

  const handleOtherError = () => {
    navigate(0);
  };

  return (
    <div className="m-auto w-auto text-center">
      {/* <Image width={200} height={200} alt="error image" src={errorImg} /> */}
      <h3>{t('error')}</h3>
      <p>ERROR</p>
      {' '}
      <p>{errorMessage}</p>
      <Button onClick={errorCode === 401 ? handleAuthError : handleOtherError}>
        {errorCode === 401 ? t('reauthorization') : t('update')}
      </Button>
    </div>
  );
};

export default ErrorPage;
