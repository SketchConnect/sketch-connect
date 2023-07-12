import { createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./service";
import {
  GET_SESSIONS,
	ADD_SESSION,
  DELETE_SESSION,
	UPDATE_STATUS,
} from "../utils";

export const getSessionsAsync = createAsyncThunk(
  GET_SESSIONS,
  async () => {
    return await sessionService.getSessions();
  }
)

export const addSessionAsync = createAsyncThunk(
  ADD_SESSION, 
  async (session) => {
    return await sessionService.addSession(session);	
});

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

