import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from './utils';
import { getUsersAsync, addUserAsync, deleteUserAsync, updateUserAsync } from './thunks';

const INITIAL_STATE = {
  list: [],
  getUsers: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  deleteUser: REQUEST_STATE.IDLE,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.getUsers = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.getUsers = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.getUsers = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addUserAsync.pending, (state) => {
        state.addUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.addUser = REQUEST_STATE.FULFILLED;
        state.list.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.addUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.deleteUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.deleteUser = REQUEST_STATE.FULFILLED;
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.deleteUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.updateUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updateUser = REQUEST_STATE.FULFILLED;
        const updatedUser = action.payload;
        const updatedIndex = state.list.findIndex((user) => user._id === updatedUser._id);
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = updatedUser;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updateUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  }
});

export default userSlice.reducer;