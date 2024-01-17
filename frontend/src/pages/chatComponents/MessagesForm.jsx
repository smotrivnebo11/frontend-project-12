import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';

// import useAuth from '../../hooks/index.jsx';

const MessagesForm = () => {
  // const { user } = useAuth();
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => console.log(values),
    // onSubmit: (values) => {
    //   const message = {
    //     text: values.body,
    //     channelId: activeChannel.id,
    //     username: user.username,
    //   }
    //   console.log(values),
    // },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group">
          <Form.Label visuallyHidden htmlFor="body">Введите сообщение...</Form.Label>
          <Form.Control
            ref={input}
            onChange={formik.handleChange}
            value={formik.values.body}
            onBlur={formik.handleBlur}
            name="body"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            required
            className="border-0 p-0 ps-2"
            id="body"
          />
          <Button
            variant="group-vertical"
            disabled={formik.errors.body}
            style={{ border: 'none' }}
            type="submit"
          >
            <BsArrowRightSquare size="20" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessagesForm;
