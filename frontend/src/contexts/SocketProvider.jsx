import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const addMessage = useCallback(
    async (body, channelId, username) => {
      await socket.timeout(3000).emitWithAck('newMessage', { body, channelId, username });
    },
    [socket],
  );

  const addChannel = useCallback(
    async (values) => {
      const { data } = await socket.timeout(3000).emitWithAck('newChannel', values);

      dispatch(channelsActions.addChannel(data));
      dispatch(channelsActions.switchChannel(data.id));
    },
    [socket, dispatch],
  );

  const renameChannel = useCallback(
    async (id, name) => {
      await socket.timeout(3000).emitWithAck('renameChannel', { id, name });
    },
    [socket],
  );

  const removeChannel = useCallback(
    async (id) => {
      await socket.timeout(3000).emitWithAck('removeChannel', { id });
    },
    [socket],
  );

  const socketContext = useMemo(
    () => ({
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }),
    [
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    ],
  );

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
