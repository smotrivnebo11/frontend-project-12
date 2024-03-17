/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { useSocket } from '../../hooks/index.js';

import { customSelectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { chatSchema } from '../../validation/validationSchema.js';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const api = useSocket();
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  const currentChannel = useSelector(channelsSelectors.currentChannel);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: chatSchema(t('errors.messageBody')),
    validateOnBlur: false,
    validateOnMount: true,
    onSubmit: async (values) => {
      const { username } = JSON.parse(localStorage.userId);

      try {
        await api.addMessage(values.body, channelId, username);
        formik.resetForm();
      } catch (error) {
        toast.error(t('errors.message'));
        rollbar.error('AddChannel', error);
      } finally {
        inputRef.current.focus();
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <InputGroup>
          <Form.Control
            ref={inputRef}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="body"
            placeholder={t('placeholders.newMessage')}
            aria-label={t('ui.newMessage')}
            value={formik.values.body}
            disabled={formik.isSubmitting}
          />
          <Button
            variant="group-vertical"
            type="submit"
            className="border-0"
            disabled={formik.errors.body || formik.isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              style={{ '--darkreader-inline-fill': 'currentColor' }}
              data-darkreader-inline-fill=""
            >
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
