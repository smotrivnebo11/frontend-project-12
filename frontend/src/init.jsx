import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as ErrorBoundaryProvider } from '@rollbar/react';

import resources from './locales/index.js';

import store from './slices/store.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import FilterProvider from './contexts/FilterProvider.jsx';
import ValidateProvider from './contexts/ValidateProvider.jsx';
import rollbarConfig from './rollbar/rollbarConfig.js';
import App from './components/App.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundaryProvider>
        <I18nextProvider i18n={i18n}>
          <ValidateProvider>
            <StoreProvider store={store}>
              <AuthProvider>
                <FilterProvider>
                  <SocketProvider socket={socket}>
                    <App />
                  </SocketProvider>
                </FilterProvider>
              </AuthProvider>
            </StoreProvider>
          </ValidateProvider>
        </I18nextProvider>
      </ErrorBoundaryProvider>
    </RollbarProvider>
  );
};

export default init;
