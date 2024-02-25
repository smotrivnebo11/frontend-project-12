/* eslint-disable functional/no-expression-statements */
// import React from 'react';
// import io from 'socket.io-client';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// // import { configureStore } from '@reduxjs/toolkit';
// import store from './slices/store';

// import App from './components/App.jsx';
// import { AuthProvider } from './contexts/AuthProvider.jsx';
// // import reducer from './slices/store.js';
// import SocketContextProvider from './contexts/socket.jsx';

// const init = async () => {
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   const socket = io('/', { autoConnect: false });

//   // const store = configureStore({
//   //   reducer,
//   // });

//   return root.render(
//     <Provider store={store}>
//       <AuthProvider>
//         <SocketContextProvider socket={socket}>
//           <App />
//         </SocketContextProvider>
//       </AuthProvider>
//     </Provider>,
//   );
// };

// export default init;

/* eslint-disable functional/no-expression-statements */
import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/store.js';
import socketApi from './socketApi/api.js';
import SocketProvider from './contexts/SocketProvider.jsx';

const init = async () => {
  const socket = io();
  const api = socketApi(socket);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  const root = ReactDOM.createRoot(document.getElementById('root'));

  return root.render(
    <StoreProvider store={store}>
      <SocketProvider api={api}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </StoreProvider>,
  );
};

export default init;
