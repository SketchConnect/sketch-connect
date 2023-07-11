import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  addSessionAsync,
  deleteSessionAsync,
	updateStatusAsync,
	setCurrentSessionAsync,} from "./thunks"

const INITIAL_STATE = {
  isPublic: true,
  status: "waiting",
  players: [],
  quadrant: [],
  finalImage: "",

  addSession: REQUEST_STATE.IDLE,
  deleteSession: REQUEST_STATE.IDLE,
  updateStatus: REQUEST_STATE.IDLE,
  setCurrentSession: REQUEST_STATE.IDLE,
  erorr: null
};

const sessionSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addSessionAsync.pending, (state) => {
      state.addSession = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(addSessionAsync.fulfilled, (state, action) => {
      state.addSession = REQUEST_STATE.FULFILLED;
      state.sessions = [...state.sessions, action.payload];
    })
    .addCase(addSessionAsync.rejected, (state, action) => {
      state.addSession = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(deleteSessionAsync.pending, (state) => {
      state.deleteSession = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(deleteSessionAsync.fulfilled, (state, action) => {
      state.deleteSession = REQUEST_STATE.FULFILLED;
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload
      );
    })
    .addCase(deleteSessionAsync.rejected, (state, action) => {
      state.deleteSession = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(updateStatusAsync.pending, (state) => {
      state.updateStatus = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(updateStatusAsync.fulfilled, (state, action) => {
      state.updateStatus = REQUEST_STATE.FULFILLED;
      //state.sessions = 
    })
    .addCase(updateStatusAsync.rejected, (state, action) => {
      state.updateStatus = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(setCurrentSessionAsync.pending, (state) => {
      state.setCurrentSession = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(setCurrentSessionAsync.fulfilled, (state, action) => {
      state.setCurrentSession = REQUEST_STATE.FULFILLED;
      state.currentSession = state.sessions.find((x) => x.id === action.payload);
    })
    .addCase(setCurrentSessionAsync.rejected, (state, action) => {
      state.setCurrentSession = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
  }
});

export default sessionSlice.reducer;