// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import {
//   Button, Form, Col, Card, Row,
// } from 'react-bootstrap';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import avatarImagePath from '../../assets/loginPage.jpeg';
// import useAuth from '../../hooks/index.jsx';
// import routes from '../../routes/routes.js';

// const LoginPage = () => {
//   const auth = useAuth();
//   const [authFailed, setAuthFailed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const input = useRef(null);

//   // useEffect(() => {
//   //   const token = localStorage.getItem('user');
//   //   if (token) {
//   //     auth.loggedIn = true;
//   //   }
//   //   auth.loggedIn = false;
//   //   navigate('/login');
//   //   input.current.focus();
//   // }, []);

//   useEffect(() => {
//     input.current.focus();
//   }, []);

//   const validationSchema = yup.object().shape({
//     username: yup.string().trim().required('Обязательное поле'),
//     password: yup.string().trim().required('Обязательное поле'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },

//     onSubmit: async (values) => {
//       setAuthFailed(false);

//       try {
//         const { data } = await axios.post(routes.loginPath(), values);
//         localStorage.setItem('user', JSON.stringify(data.token));
//         auth.logIn();
//         setAuthFailed(false);
//         const { from } = location.state || { from: { pathname: '/' } };
//         navigate(from);
//       } catch (err) {
//         formik.setSubmitting(false);
//         if (err.isAxiosError && err.response.status === 401) {
//           setAuthFailed(true);
//           navigate('/login');
//           input.current.select();
//           return;
//         }
//         throw err;
//       }
//     },
//     validationSchema,
//   });

//   return (
//     <div className="container-fluid h-100">
//       <Row className="justify-content-center align-content-center h-100">
//         <Col className="col-12 col-md-8 col-xxl-6">
//           <Card className="shadow-sm">
//             <Card.Body className="p-5 row">
//               <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
//                 <img src={avatarImagePath} alt="LogIn page" className="roundedCircle" />
//               </div>
//               <Form
//                 className="col-12 col-md-6 mt-3 mt-mb-0"
//                 onSubmit={formik.handleSubmit}
//               >
//                 <h1 className="text-center mb-4">Войти</h1>
//                 <fieldset disabled={formik.isSubmitting}>
//                   <Form.Group className="mb-3 form-floating" controlId="username">
//                     <Form.Control
//                       type="text"
//                       onChange={formik.handleChange}
//                       value={formik.values.username}
//                       onBlur={formik.handleBlur}
//                       placeholder="username"
//                       autoComplete="username"
//                       isInvalid={authFailed}
//                       required
//                       ref={input}
//                     />
//                     {formik.touched.username && formik.errors.username
//                       ? (<div>{formik.errors.username}</div>)
//                       : null}
//                     <Form.Label>Ваш ник</Form.Label>
//                   </Form.Group>

//                   <Form.Group className="mb-4 form-floating" controlId="password">
//                     <Form.Control
//                       type="password"
//                       onChange={formik.handleChange}
//                       value={formik.values.password}
//                       onBlur={formik.handleBlur}
//                       placeholder="password"
//                       autoComplete="current-password"
//                       isInvalid={authFailed}
//                       required
//                       ref={input}
//                     />
//                     {formik.touched.password && formik.errors.password
//                       ? (<div>{formik.errors.password}</div>)
//                       : null}
//                     <Form.Label>Пароль</Form.Label>
// eslint-disable-next-line max-len
//                     <Form.Control.Feedback type="invalid" className="invalid-feedback" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
//                   </Form.Group>
// eslint-disable-next-line max-len
//                   <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
//                 </fieldset>
//               </Form>
//             </Card.Body>
//             <Card.Footer className="p-4">
//               <div className="text-center">
//                 <span>Нет аккаунта?</span>
//                 {' '}
//                 <NavLink to="/signup">Регистрация</NavLink>
//               </div>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default LoginPage;

import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import { loginSchema } from '../../../validation/validationSchema.js';
import useAuth from '../../../hooks/index.js';
import loginImg from '../../../assets/loginPage.jpeg';
import routes from '../../../routes/routes.js';

const LoginPage = () => {
  const inputNameRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      validationSchema: loginSchema(t('errors.required')),
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem('userdata', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);

        if (err.isAxiosError) {
          if (err.response.status === 401) {
            setAuthFailed(true);
            navigate('/login');
            inputNameRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(err.message);
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt={t('enter')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('enter')}</h1>

                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('placeholders.login')}
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputNameRef}
                  />
                  <Form.Label htmlFor="username">{t('placeholders.login')}</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                  <div className="invalid-tooltip">{t('errors.invalidFeedback')}</div>
                </Form.Floating>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('enter')}
                </Button>

              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-2">
                  {t('noAccount')}
                </span>
                <Card.Link as={Link} to="/signup">{t('registration')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
