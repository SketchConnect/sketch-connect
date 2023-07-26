import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  addSessionAsync,
  deleteSessionAsync,
  updateStatusAsync,
  getSessionsAsync,
  addPlayerAsync
} from "./thunks";

const INITIAL_STATE = {
  _id: "",
  isPublic: true,
  status: "waiting",
  players: [],
  quadrants: [],
  finalImage: "",
  sessions: [],
  getSessions: REQUEST_STATE.IDLE,
  addSession: REQUEST_STATE.IDLE,
  deleteSession: REQUEST_STATE.IDLE,
  updateStatus: REQUEST_STATE.IDLE,
  addPlayer: REQUEST_STATE.IDLE,
  erorr: null
};

const sessionSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {
    resetSession: (state) => {
      state._id = "";
      state.isPublic = true;
      state.status = "waiting";
      state.quadrants = [];
      state.finalImage = "";
    },
    setSession: (state, action) => {
      state._id = action.payload.session._id;
      state.isPublic = action.payload.session.isPublic;
      state.status = action.payload.session.status;
      state.players = action.payload.session.players;
      state.quadrant = action.payload.session.quadrant;
      state.finalImage = action.payload.session.finalImage;
      state.name = action.payload.session.name;
    },
    clearSessionId: (state) => {
      state._id = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionsAsync.pending, (state) => {
        state.getSessions = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getSessionsAsync.fulfilled, (state, action) => {
        state.getSessions = REQUEST_STATE.FULFILLED;
        state.sessions = action.payload;
      })
      .addCase(getSessionsAsync.rejected, (state, action) => {
        state.getSessions = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
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
          (session) => session._id !== action.payload
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
        state.status = action.payload;
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
      });
  }
});

export const { resetSession, setSession, clearSessionId } =
  sessionSlice.actions;

export default sessionSlice.reducer;
