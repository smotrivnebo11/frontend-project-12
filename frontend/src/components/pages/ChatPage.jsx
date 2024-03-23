import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
// import { animateScroll } from 'react-scroll';

import { useAuth } from '../../hooks/index.js';

import fetchData from '../../slices/fetchData.js';
import { selectors as loadingStateSelectors, stateLoad } from '../../slices/loadingSlice.js';
import { customSelectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { customSelectors as messagesSelectors } from '../../slices/messagesSlice.js';

import Channels from '../chatComponents/Channels.jsx';
import Messages from '../chatComponents/Messages.jsx';
import Modal from '../chatComponents/modals/index.jsx';
import LoadingSpinner from '../chatComponents/LoadingSpinner.jsx';

const handleUpdate = (navigate) => () => {
  navigate(0);
};

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="m-auto w-auto text-center">
      <p>{t('errors.unknown')}</p>
      <Button onClick={handleUpdate(navigate)}>
        {t('ui.updatePage')}
      </Button>
    </div>
  );
};

const Content = () => {
  const loadingState = useSelector(loadingStateSelectors.getStatus);
  const channels = useSelector(channelsSelectors.allChannels);
  const currentChannel = useSelector(channelsSelectors.currentChannel);
  const currentChannelMessages = useSelector(messagesSelectors.currentChannelMessages);

  // useEffect(() => {
  //   const argument = { containerId: 'messages-box', delay: 0, duration: 0 };
  //   animateScroll.scrollToBottom(argument);
  // }, [currentChannelMessages.length]);

  console.log(currentChannel);

  switch (loadingState) {
    case stateLoad.success:
      return (
        <>
          <Channels channels={channels} currentChannelId={currentChannel.id} />
          <Messages channel={currentChannel} messages={currentChannelMessages} />
        </>
      );

    case stateLoad.fail:
      return <Error />;

    default:
      return <LoadingSpinner />;
  }
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader, logOut } = useAuth();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  const loadingState = useSelector(loadingStateSelectors.getStatus);

  switch (loadingState) {
    case stateLoad.error:
      toast.error(t('errors.unauthorized'));
      logOut();
      break;
    case stateLoad.fail:
      toast.error(t('errors.network'));
      break;

    default:
      break;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 flex-md-row bg-white">
        <Content />
      </Row>
      <Modal />
    </Container>
  );
};

export default ChatPage;
