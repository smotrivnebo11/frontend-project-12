/* eslint-disable functional/no-expression-statements */
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import MessagesForm from '../chatComponents/MessagesForm.jsx';
import { useSocketApi } from '../../hooks/index.jsx';

import { actions as channelsActions } from '../../slices/channelsSlice.js';

import Channels from '../chatComponents/Channels.jsx';
import Messages from '../chatComponents/Messages.jsx';

const MainPage = () => {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const { connectSocket, disconnectSocket, getChannelsData } = useSocketApi();
  // const messages = useSelector(messagesSelector.selectAll);
  // const currentChannelData = useSelector(currentChannel);
  // const currentChannelName = currentChannelData?.name;
  // const currentChannelMessages = messages.filter(
  //   (message) => message.сhannelId === currentChannelData?.id,
  // );
  // const currentChannelMessagesCount = currentChannelMessages.length;

  // useEffect(() => {
  //   dispatch(channelsActions.fetchData(token));
  // }, [dispatch, token]);
  useEffect(() => {
    dispatch(channelsActions.fetchData(getChannelsData));
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket, dispatch, getChannelsData]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        {/* <div>currentChannelName={currentChannelName}</div>
        <div>currentChannelMessagesCount={currentChannelMessagesCount}</div> */}
        <MessagesForm />
      </Row>
    </Container>
  );
};

export default MainPage;
