import { createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./service";
import {
  GET_SESSIONS,
  GET_SESSION,
  ADD_SESSION,
  DELETE_SESSION,
  UPDATE_STATUS,
  ADD_PLAYER,
  FINAL_IMAGE,
  QUADRANT_IMAGE,
  REMOVE_PLAYER
} from "../utils";

export const getSessionsAsync = createAsyncThunk(GET_SESSIONS, async () => {
  return await sessionService.getSessions();
});

export const getSessionAsync = createAsyncThunk(
  GET_SESSION,
  async (sessionId) => {
    return await sessionService.getSession(sessionId);
  }
);

export const addSessionAsync = createAsyncThunk(
  ADD_SESSION,
  async (session) => {
    return await sessionService.addSession(session);
  }
);

export const deleteSessionAsync = createAsyncThunk(
  DELETE_SESSION,
  async (sessionId) => {
    return await sessionService.deleteSession(sessionId);
  }
);

export const updateStatusAsync = createAsyncThunk(
  UPDATE_STATUS,
  async ({ sessionId, status }) => {
    return await sessionService.updateStatus(sessionId, status);
  }
);

export const addPlayerAsync = createAsyncThunk(
  ADD_PLAYER,
  async ({ session, player }) => {
    return await sessionService.addPlayer(session._id, player);
  }
);

export const removePlayerAsync = createAsyncThunk(
  REMOVE_PLAYER,
  async ({ session, player }) => {
    return sessionService.removePlayer(session._id, player);
  }
)

export const finalImageAsync = createAsyncThunk(
  FINAL_IMAGE,
  async ({ sessionId, image }) => {
    return await sessionService.finalImage(sessionId, image);
  }
);

export const quadrantImageAsync = createAsyncThunk(
  QUADRANT_IMAGE,
  async ({ sessionId, image, quadrantNumber }) => {
    return await sessionService.quadrantImage(sessionId, image, quadrantNumber);
  }
);
