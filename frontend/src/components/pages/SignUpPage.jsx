/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Col, Container, Form, Image, Row,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useFormik } from 'formik';

import { useAuth, useValidate } from '../../hooks/index.js';
import { apiRoutes, appPaths } from '../../routes/routes.js';

import signupImg from '../../assets/signupPage.jpeg';

const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationSchema } = useValidate();

  const [regFailed, setRegFailed] = useState(false);
  const inputName = useRef(null);

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputName.current && regFailed) {
      inputName.current.select();
    }
  }, [regFailed]);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },

    validationSchema: registrationSchema(t),

    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async ({ username, password }) => {
      setRegFailed(false);
      try {
        const { data } = await axios.post(apiRoutes.signupPath(), { username, password });
        logIn(data);
        const { from } = location.state || { from: { pathname: appPaths.chatPagePath() } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError) {
          if (error.code === 'ERR_NETWORK') {
            toast.error(t('errors.network'));
            rollbar.error('SignupPage', error);
          }
          if (error.response.status === 409) {
            setRegFailed(true);
            rollbar.error('SignupPage', error);
          }
        }
        throw error;
      }
    },
  });

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;
  const isInvalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image width={250} height={250} alt={t('ui.registration')} src={signupImg} />
              </Col>

              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('ui.registration')}</h1>
                <fieldset disabled={formik.isSubmitting}>

                  <Form.Floating className="mb-3" controlid="floatingInput">
                    <Form.Control
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder={t('placeholders.username')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={regFailed || isInvalidUsername}
                      isValid={formik.touched.username && !formik.errors.username}
                      ref={inputName}
                      required
                    />
                    <Form.Label htmlFor="username">{t('placeholders.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">{formik.errors.username}</Form.Control.Feedback>
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
                      isInvalid={regFailed || isInvalidPassword}
                      isValid={formik.touched.password && !formik.errors.password}
                      required
                    />
                    <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Floating>

                  <Form.Floating className="mb-4" controlid="floatingPassword">
                    <Form.Control
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="password"
                      placeholder={t('placeholders.confirmPassword')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={regFailed || isInvalidConfirmPassword}
                      isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                      required
                    />
                    <Form.Label htmlFor="confirmPassword">{t('placeholders.confirmPassword')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword || t('errors.userExist')}</Form.Control.Feedback>
                  </Form.Floating>

                  <Button type="submit" variant="outline-info" className="w-100 mb-3">{t('buttons.makeRegistration')}</Button>
                </fieldset>
              </Form>

            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('ui.exist')}</span>
                <a href={appPaths.loginPagePath()}>{t('buttons.enter')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
