import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectors, actions } from '../../../slices/modalSlice.js';

import Add from './AddChannel.jsx';
import Remove from './RemoveChannel.jsx';
import Rename from './RenameChannel.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const ModalRoot = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(selectors.getModalType);
  const isOpen = useSelector(selectors.isModalOpened);

  const handleClose = () => dispatch(actions.close());

  const CurrentModal = modals[modalType];

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </Modal>
  );
};

export default ModalRoot;
