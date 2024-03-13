/* eslint-disable max-len */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import { useSocket } from '../../../hooks/index.js';

import { selectors } from '../../../slices/modalSlice.js';

const RemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useSocket();
  const rollbar = useRollbar();

  const { channelId } = useSelector(selectors.getModalContext);

  const onClick = () => {
    try {
      api.removeChannel(channelId);
      // toast.success(t('notify.removedChannel'));
      toast.success(t('success.removeChannel'));
      handleClose();
    } catch (error) {
      // toast.error(t('notify.networkError'));
      toast.error(t('errors.network'));
      rollbar.error('RemoveChannel', error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
        {/* {t('ui.removeChannel')} */}
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.confirm')}</p>
        {/* Уверены? */}
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleClose}
          >
            {/* {t('buttons.cancel')} */}
            {t('cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={onClick}
          >
            {/* {t('buttons.remove')} */}
            {t('modal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
