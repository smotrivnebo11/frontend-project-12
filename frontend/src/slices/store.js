import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';
import loadingStateReducer from './loadingSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    loading: loadingStateReducer,
  },
});
