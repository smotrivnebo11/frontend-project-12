import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channel = action.payload;
        const channelMessages = Object
          .values(state.entities)
          .filter((e) => channel.id === e.channelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, channelMessages);
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload.messages);
      });
  },
});

export const { actions } = messagesSlice;
const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const customSelectors = {
  allMesagges: selectors.selectAll,
  currentChannelMessages: (state) => {
    const { currentChannelId } = state.channels;

    // return selectors.selectAll(state)
    //   .filter(({ channelId }) => channelId === currentChannelId);
    const messages = selectors.selectAll(state);
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  },
};
export default messagesSlice.reducer;
