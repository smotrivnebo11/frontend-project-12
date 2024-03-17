import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import { useFormik } from 'formik';

import { useSocket } from '../../../hooks/index.js';
import { customSelectors } from '../../../slices/channelsSlice.js';
import { selectors } from '../../../slices/modalSlice.js';
import { newChannelSchema } from '../../../validation/validationSchema.js';

const RenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useSocket();
  const rollbar = useRollbar();

  const inputRef = useRef(null);

  const channelsNames = useSelector(customSelectors.channelsNames);
  const { channelId, channelName } = useSelector(selectors.getModalContext);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: newChannelSchema(channelsNames, t('modal.unique'), t('modal.lengthParams')),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      try {
        const { name } = values;
        api.renameChannel(channelId, name);
        toast.success(t('success.renameChannel'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);

        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();

          return;
        }
        toast.error(t('errors.network'));
        rollbar.error('RenameChannel', error);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
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

export default RenameChannel;
