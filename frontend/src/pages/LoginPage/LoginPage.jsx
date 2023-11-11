import React from 'react'
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
    login: '',
    password: ''
  },
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
      <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
       <Button type="submit">Submit</Button>
     </form>
    </div>
);
}

export default LoginPage;