/* eslint no-param-reassign: ["error", { "props": true,
"ignorePropertyModificationsFor": ["state"] }] */

// import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// import { actions as channelsActions } from './channelsSlice.js';

// const initialState = { messages: [] };
// const messagesAdapter = createEntityAdapter();
// // const initialState = messagesAdapter.getInitialState();

// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState,
//   reducers: {
//     addMessage: messagesAdapter.addOne,
//     addMessages: messagesAdapter.addMany,
//   },
//   // reducers: {
//   //   addMessage: (state, { payload }) => {
//   //     state.messages.push(payload);
//   //   },
//   // },
//   extraReducers: (builder) => {
//     builder
//       .addCase(channelsActions.fetchData.fulfilled, (state, { payload }) => {
//         state.messages = payload.messages;
//       });
//   },
// });

// const actions = {
//   ...messagesSlice.actions,
// };

// export { actions };
// export const selectors = messagesAdapter.getSelectors((state) => state.messages);
// export { messagesAdapter };
// export default messagesSlice.reducer;

/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },

  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, { payload }) => {
      state.messages = payload.messages;
    }),
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
