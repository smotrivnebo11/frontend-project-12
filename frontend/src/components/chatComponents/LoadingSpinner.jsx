import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="m-auto w-auto text-center">
      <h2 className="me-2">{t('loading')}</h2>
      <Spinner variant="primary" animation="border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;

// const Loader = () => (
//   <div className="h-100 d-flex justify-content-center align-items-center">
//     <Spinner animation="border" variant="primary" role="status" />
//   </div>
// );
