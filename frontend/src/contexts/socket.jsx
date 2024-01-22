import React from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from './index.jsx';
import { actions } from '../slices/channelsSlice';

const SocketContextProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const connectSocket = () => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(actions.addMessage(message));
    });
  };

  const disconnectSocket = () => {
    socket.off();
    socket.disconnect();
  };

  const sendMessage = async (message) => {
    await socket
      .timeout(4000)
      .emit('newMessage', { ...message });
  };

  return (
    <SocketContext.Provider value={{
      connectSocket,
      disconnectSocket,
      sendMessage,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
