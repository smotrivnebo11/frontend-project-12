/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { actions as loadingStateActions } from './loadingSlice.js';

const initialState = ({
  isOpened: false,
  type: null,
  context: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload: { type, context = null } }) => {
      state.isOpened = true;
      state.type = type;
      state.context = context;
    },
    close: (state) => {
      state.isOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadingStateActions.unload, () => initialState);
  },
});

const { actions } = modalSlice;
const selectors = {
  getModalType: (state) => state.modal.type,
  isModalOpened: (state) => state.modal.isOpened,
  getModalContext: (state) => state.modal.context,
};

export { actions, selectors };
export default modalSlice.reducer;
