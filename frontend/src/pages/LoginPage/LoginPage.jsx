import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Form, Col, Card, Row,
} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import avatarImagePath from '../../assets/loginPage.jpeg';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes/routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const input = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      auth.loggedIn = true;
    }
    auth.loggedIn = false;
    navigate('/login');
    input.current.focus();
  }, []);

  // useEffect(() => {
  //   input.current.focus();
  // }, []);

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required('Обязательное поле'),
    password: yup.string().trim().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(data.token));
        navigate('/');

        // const res = await axios.post(routes.loginPath(), values);
        // const logIn = (data) => {
        //   localStorage.setItem('user', JSON.stringify(data));
        //   setUser(data);
        // };
        // localStorage.setItem('userId', JSON.stringify(res.data));
        // auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          input.current.select();
          return;
        }
        throw err;
      }
    },
    validationSchema,
  });

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatarImagePath} alt="LogIn page" className="roundedCircle" />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating" controlId="username">
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      placeholder="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={input}
                    />
                    {formik.touched.username && formik.errors.username
                      ? (<div>{formik.errors.username}</div>)
                      : null}
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4 form-floating" controlId="password">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      placeholder="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                      ref={input}
                    />
                    {formik.touched.password && formik.errors.password
                      ? (<div>{formik.errors.password}</div>)
                      : null}
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <NavLink to="/signup">Регистрация</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
