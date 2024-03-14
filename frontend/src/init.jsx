import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import resources from './locales/index.js';

import store from './slices/store.js';

import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import FilterProvider from './contexts/FilterProvider.jsx';
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

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <StoreProvider store={store}>
            <AuthProvider>
              <FilterProvider>
                <SocketProvider socket={socket}>
                  <App />
                </SocketProvider>
              </FilterProvider>
            </AuthProvider>
          </StoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
