import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { useSocket, useFilter } from '../../../hooks/index.js';
// import { useSocket } from '../../../hooks/index.js';
import { customSelectors } from '../../../slices/channelsSlice.js';
import { newChannelSchema } from '../../../validation/validationSchema.js';

const AddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useSocket();
  const rollbar = useRollbar();
  const filterProfanity = useFilter();

  const inputRef = useRef(null);

  const channelsName = useSelector(customSelectors.allChannels)
    .reduce((acc, channel) => [...acc, channel.name], []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: newChannelSchema(channelsName, t),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      // const { name } = values;
      const filteredName = filterProfanity(values.name);
      console.log('filter', filteredName);
      try {
        // const { name } = values;
        // console.log('name', name);
        // console.log('filter', filterProfanity(name));
        // api.addChannel(filterProfanity(name));
        api.addChannel({ name: filteredName });
        // api.addChannel(values);
        toast.success(t('success.newChannel'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();

          return;
        }
        toast.error(t('errors.network'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
        >
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              name="name"
              ref={inputRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
            />
            <Form.Label
              visuallyHidden
            >
              {t('modal.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div
              className="d-flex justify-content-end"
            >
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('buttons.cancel')}
              </Button>
              <Button
                variant="info"
                type="submit"
              >
                {t('buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
