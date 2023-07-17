import { createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./service";
import {
  GET_SESSIONS,
  ADD_SESSION,
  DELETE_SESSION,
  UPDATE_STATUS,
  ADD_PLAYER,
  FINAL_IMAGE
} from "../utils";

export const getSessionsAsync = createAsyncThunk(GET_SESSIONS, async () => {
  return await sessionService.getSessions();
});

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
  async (sessionId) => {
    return await sessionService.updateStatus(sessionId);
  }
);

export const addPlayerAsync = createAsyncThunk(
  ADD_PLAYER,
  async ({ session, player }) => {
    // TODO: change to player._id
    return await sessionService.addPlayer(session._id, player);
  }
);

export const finalImageAsync = createAsyncThunk(
  FINAL_IMAGE,
  async ({sessionId, image}) => {
    return await sessionService.finalImage(sessionId, image);
  }
)
