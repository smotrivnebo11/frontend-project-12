/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});
// const initialState = channelsAdapter.getInitialState({
//   currentChannelId: null,
//   loadingStatus: statuses.notLoaded,
//   error: null,
// });

// const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids[0];
        state.currentChannelId = newCurrentChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    // removeChannel: (state, { payload }) => {
    //   const removeChannelId = payload;
    //   const activeChannelId = state.currentChannelId;
    //   state.currentChannelId = (removeChannelId === activeChannelId)
    //     ? defaultChannelId
    //     : state.currentChannelId;
    switchChannel: (state, { payload }) => {
      state.currentChannelId = payload;
      // state.currentChannelId = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const customSelectors = {
  allChannels: selectors.selectAll,
  channelsNames: (state) => selectors.selectAll(state).map(({ name }) => name),
  currentChannel: (state) => {
    const { currentChannelId } = state.channels;

    return selectors.selectById(state, currentChannelId);
  },
};

export default channelsSlice.reducer;

// const customSelectors = {
//   selectById: selectors.selectById,
//   selectCurrentChannelId: (state) => state.channels.currentChannelId,

//   selectCurrentChannel: (state) => {
//     const { currentChannelId } = state.channels;
//     return selectors.selectById(state, currentChannelId);
//   },

//   selectChannelsNames: (state) => {
//     const channels = selectors.selectAll(state);
//     return channels.map(({ name }) => name);
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDataThunk.fulfilled, (state, action) => {
//         channelsAdapter.setAll(state, action.payload.channels);
//         state.currentChannelId = action.payload.currentChannelId;
//         state.loadingStatus = statuses.loaded;
//         state.error = null;
//       })
//       .addCase(fetchDataThunk.pending, (state) => {
//         state.loadingStatus = statuses.loading;
//         state.error = null;
//       })
//       .addCase(fetchDataThunk.rejected, (state, action) => {
//         state.loadingStatus = statuses.loadError;
//         state.error = action.payload;
//       });
//   },
// });

// const { actions } = channelsSlice;

// const selectors = channelsAdapter.getSelectors((state) => state.channels);

// const customSelectors = {
//   selectAll: selectors.selectAll,

//   selectById: selectors.selectById,

//   selectCurrentChannelId: (state) => state.channels.currentChannelId,

//   selectCurrentChannel: (state) => {
//     const { currentChannelId } = state.channels;
//     return selectors.selectById(state, currentChannelId);
//   },

//   selectChannelsNames: (state) => {
//     const channels = selectors.selectAll(state);
//     return channels.map(({ name }) => name);
//   },

// };

// export { actions, customSelectors as selectors };

// export default channelsSlice.reducer;
