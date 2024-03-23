import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { appPaths } from '../../routes/routes.js';

import notFoundImg from '../../assets/notFound.jpeg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image width="50%" height="50%" alt={t('pages.pageNotFound')} src={notFoundImg} fluid />
      <h1 className="h4 text-muted">{t('pages.pageNotFound')}</h1>
      <p className="text-muted">
        {t('pages.redirect')}
        {' '}
        <Link to={appPaths.chatPagePath()}>{t('pages.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
