/* eslint-disable functional/no-expression-statements */
import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App, { AuthProvider } from './pages/App.jsx';
import reducer from './slices/store.js';
import SocketContextProvider from './contexts/socket.jsx';

const init = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io('/', { autoConnect: false });

  const store = configureStore({
    reducer,
  });

  return root.render(
    <Provider store={store}>
      <AuthProvider>
        <SocketContextProvider socket={socket}>
          <App />
        </SocketContextProvider>
      </AuthProvider>
    </Provider>,
  );
};

export default init;
