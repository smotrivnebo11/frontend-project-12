// import { combineReducers } from '@reduxjs/toolkit';

// import channelsSlice, { actions as channelsActions } from './channelsSlice.js';
// import messagesSlice, { actions as messagesActions } from './messagesSlice.js';

// const actions = {
//   ...channelsActions,
//   ...messagesActions,
// };

// export {
//   actions,
// };

// // export default combineReducers({
// //   channelsInfo: channelsSlice,
// //   messagesInfo: messagesSlice,
// // });

// export default combineReducers({
//   channels: channelsSlice,
//   messages: messagesSlice,
// });

import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
