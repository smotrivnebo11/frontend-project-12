/* eslint-disable functional/no-expression-statements */
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import fetchData from '../../slices/channelsSlice.js';

import Channels from '../chatComponents/Channels.jsx';
import Messages from '../chatComponents/Messages.jsx';

const MainPage = () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
