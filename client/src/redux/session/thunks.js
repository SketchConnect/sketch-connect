import { createAsyncThunk } from "@reduxjs/toolkit";
import { actions } from "./actions";
import sessionService from "./service";

export const getSessionsAsync = createAsyncThunk(
  actions.GET_SESSIONS,
  async () => {
    return await sessionService.getSessions();
  }
);

export const getSessionAsync = createAsyncThunk(
  actions.GET_SESSION,
  async (sessionId) => {
    return await sessionService.getSession(sessionId);
  }
);

export const addSessionAsync = createAsyncThunk(
  actions.ADD_SESSION,
  async (session) => {
    return await sessionService.addSession(session);
  }
);

export const deleteSessionAsync = createAsyncThunk(
  actions.DELETE_SESSION,
  async (sessionId) => {
    return await sessionService.deleteSession(sessionId);
  }
);

export const updateStatusAsync = createAsyncThunk(
  actions.UPDATE_STATUS,
  async ({ sessionId, status }) => {
    return await sessionService.updateStatus(sessionId, status);
  }
);

export const addPlayerAsync = createAsyncThunk(
  actions.ADD_PLAYER,
  async ({ session, player }) => {
    return await sessionService.addPlayer(session._id, player);
  }
);

export const removePlayerAsync = createAsyncThunk(
  actions.REMOVE_PLAYER,
  async ({ session, player }) => {
    return sessionService.removePlayer(session._id, player);
  }
);

export const updateFinalImageAsync = createAsyncThunk(
  actions.UPDATE_FINAL_IMAGE,
  async ({ sessionId, image }) => {
    return await sessionService.updateFinalImage(sessionId, image);
  }
);
