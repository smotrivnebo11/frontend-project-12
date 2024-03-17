import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Col, Container, Form, Image, Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';

import { loginSchema } from '../../../validation/validationSchema.js';
import { useAuth } from '../../../hooks/index.js';
import { apiRoutes, appPaths } from '../../../routes/routes.js';

import loginImg from '../../../assets/loginPage.jpeg';

const LoginPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const rollbar = useRollbar();
  const location = useLocation();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);
  const inputName = useRef(null);

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputName.current && authFailed) {
      inputName.current.select();
    }
  }, [authFailed]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validationSchema: loginSchema(t('errors.required')),

    validateOnChange: false,

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(apiRoutes.loginPath(), values);
        logIn(data);
        const { from } = location.state || { from: { pathname: appPaths.chatPagePath() } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError) {
          if (error.code === 'ERR_NETWORK') {
            toast.error(t('errors.network'));
            rollbar.error('LoginPage', error);
          }
          if (error.response.status === 401) {
            setAuthFailed(true);
            rollbar.error('LoginPage', error);
          }
        }
        throw error;
      }
    },

  });

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image width={250} height={250} alt={t('buttons.enter')} src={loginImg} />
              </Col>

              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('buttons.enter')}</h1>
                <fieldset disabled={formik.isSubmitting}>

                  <Form.Floating className="mb-3" controlid="floatingInput">
                    <Form.Control
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder={t('placeholders.login')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={authFailed || isInvalidUsername}
                      ref={inputName}
                      required
                    />
                    <Form.Label htmlFor="username">{t('placeholders.login')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Floating>

                  <Form.Floating className="mb-4" controlid="floatingPassword">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      placeholder={t('placeholders.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={authFailed || isInvalidPassword}
                      required
                    />
                    <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">{formik.errors.password || t('errors.invalidFeedback')}</Form.Control.Feedback>
                  </Form.Floating>

                  <Button type="submit" variant="outline-info" className="w-100 mb-3">{t('buttons.enter')}</Button>
                </fieldset>
              </Form>

            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
              <span>{t('ui.noAccount')}</span>
                {' '}
                <Link to={appPaths.signupPagePath()}>{t('ui.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
