import React from 'react'
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';

const LoginPage = () => {
  const validate = values => {
    const errors = {};
    if (!values.login) {
      errors.login = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          name="login"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.login}
        />
        {formik.errors.login ? <div>{formik.errors.login}</div> : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default LoginPage;