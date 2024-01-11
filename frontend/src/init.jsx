/* eslint-disable functional/no-expression-statements */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './pages/App.jsx';
import reducer from './slices/store.js';

const init = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  const store = configureStore({
    reducer,
  });

  return root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

export default init;
