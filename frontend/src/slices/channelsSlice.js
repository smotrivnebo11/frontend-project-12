/* eslint no-param-reassign: ["error", { "props": true,
"ignorePropertyModificationsFor": ["state"] }] */

import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes/routes.js';

const fetchData = createAsyncThunk(
  'channels/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: error.status });
    }
  },
);

const generalChannelId = 1;

// const initialState = {
//   loading: false,
//   channels: [],
//   currentChannelId: generalChanelId,
// };

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: generalChannelId });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: { addChannel: channelsAdapter.addOne },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    }),
});

// const channelsSlice = createSlice({
//   name: 'channels',
//   initialState,
//   reducers: {
//     setCurrentChannel: (state, { payload }) => {
//       state.currentChannelId = payload.id;
//     },
//     addChannel: (state, { payload }) => {
//       state.channels.push(payload);
//     },
//     deleteChannel: (state, { payload }) => {
//       state.channels = state.channels
//         .filter((channel) => channel.id !== payload.id);
//     },
//     channelRename: (state, { payload }) => {
//       const { id, name } = payload;
//       const renamedChannel = state.channels
//         .find((channel) => channel.id === id);
//       renamedChannel.name = name;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchData.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.channels = payload.channels;
//         state.currentChannelId = payload.currentChannelId;
//       })
//       .addCase(fetchData.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

const actions = {
  ...channelsSlice.actions,
  fetchData,
};

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { actions };
export { channelsAdapter };
// export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
