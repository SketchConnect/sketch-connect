import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  addSessionAsync,
  deleteSessionAsync,
  updateStatusAsync,
  addPlayerAsync,
  getSessionAsync,
  removePlayerAsync,
  updateFinalImageAsync
} from "./thunks";

const INITIAL_STATE = {
  _id: "",
  isPublic: true,
  status: "waiting",
  players: [],
  quadrants: [],
  finalImage: "",
  topic: "",
  getSession: REQUEST_STATE.IDLE,
  addSession: REQUEST_STATE.IDLE,
  deleteSession: REQUEST_STATE.IDLE,
  updateStatus: REQUEST_STATE.IDLE,
  addPlayer: REQUEST_STATE.IDLE,
  removePlayer: REQUEST_STATE.IDLE,
  updateFinalImage: REQUEST_STATE.IDLE,
  error: null
};

const sessionSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {
    resetSession: (state) => {
      state._id = "";
      state.isPublic = true;
      state.status = "waiting";
      state.players = [];
      state.quadrants = [];
      state.finalImage = "";
      state.topic = "";
    },
    setSession: (state, action) => {
      state._id = action.payload.session._id;
      state.isPublic = action.payload.session.isPublic;
      state.status = action.payload.session.status;
      state.players = action.payload.session.players;
      state.quadrants = action.payload.session.quadrants;
      state.finalImage = action.payload.session.finalImage;
      state.name = action.payload.session.name;
      state.topic = action.payload.session.topic;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionAsync.pending, (state) => {
        state.getSession = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getSessionAsync.fulfilled, (state, action) => {
        state.getSession = REQUEST_STATE.FULFILLED;
        state._id = action.payload._id;
        state.isPublic = action.payload.isPublic;
        state.status = action.payload.status;
        state.players = action.payload.players;
        state.quadrants = action.payload.quadrants;
        state.finalImage = action.payload.finalImage;
        state.topic = action.payload.topic;
      })
      .addCase(getSessionAsync.rejected, (state, action) => {
        state.getSession = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addSessionAsync.pending, (state) => {
        state.addSession = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addSessionAsync.fulfilled, (state, action) => {
        state.addSession = REQUEST_STATE.FULFILLED;
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
        state.status = action.payload.status;
      })
      .addCase(updateStatusAsync.rejected, (state, action) => {
        state.updateStatus = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addPlayerAsync.pending, (state) => {
        state.addPlayer = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addPlayerAsync.fulfilled, (state, action) => {
        state.addPlayer = REQUEST_STATE.FULFILLED;
        state.players = [...state.players, action.payload.id];
      })
      .addCase(addPlayerAsync.rejected, (state, action) => {
        state.addPlayer = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(removePlayerAsync.pending, (state) => {
        state.removePlayer = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(removePlayerAsync.fulfilled, (state, action) => {
        state.removePlayer = REQUEST_STATE.FULFILLED;
        state.players = state.players.filter(
          (player) => player._id !== action.payload.id
        );
      })
      .addCase(removePlayerAsync.rejected, (state, action) => {
        state.removePlayer = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateFinalImageAsync.pending, (state) => {
        state.updateFinalImage = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(updateFinalImageAsync.fulfilled, (state, action) => {
        state.updateFinalImage = REQUEST_STATE.FULFILLED;
        state.finalImage = action.payload;
      })
      .addCase(updateFinalImageAsync.rejected, (state, action) => {
        state.updateFinalImage = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  }
});

export const { resetSession, setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
