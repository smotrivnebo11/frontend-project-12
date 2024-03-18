import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  // const addMessage = async (body, channelId, username) => {
  //   await socket.emit('newMessage', { body, channelId, username });
  // };
  const addMessage = useCallback(
    async (body, channelId, username) => {
      await socket.timeout(3000).emitWithAck('newMessage', { body, channelId, username });
    },
    [socket],
  );

  // const addChannel = async (values) => {
  //   const { data } = await socket.emitWithAck('newChannel', values);
  //   dispatch(channelsActions.addChannel(data));
  //   dispatch(channelsActions.switchChannel(data.id));
  // };
  const addChannel = useCallback(
    async (values) => {
      const { data } = await socket.timeout(3000).emitWithAck('newChannel', values);

      dispatch(channelsActions.addChannel(data));
      dispatch(channelsActions.switchChannel({ id: data.id }));
    },
    [socket, dispatch],
  );

  // const renameChannel = async (id, name) => {
  //   await socket.emit('renameChannel', { id, name });
  // };
  const renameChannel = useCallback(
    async (id, nam) => {
      await socket.timeout(3000).emitWithAck('renameChannel', id, nam);
    },
    [socket],
  );

  // const removeChannel = async (id) => {
  //   await socket.emit('removeChannel', { id });
  // };
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
    // <SocketContext.Provider value={{
    //   addChannel, addMessage, renameChannel, removeChannel,
    // }}
    // >
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
