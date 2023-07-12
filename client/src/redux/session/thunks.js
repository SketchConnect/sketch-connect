import { createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./service";
import {
  GET_SESSIONS,
	ADD_SESSION,
  DELETE_SESSION,
	UPDATE_STATUS,
  ADD_PLAYER
} from "../utils";

export const getSessionsAsync = createAsyncThunk(
  GET_SESSIONS,
  async () => {
    return await sessionService.getSessions();
  }
)

export const addSessionAsync = createAsyncThunk(
  ADD_SESSION, 
  async (session, host) => {
    return await sessionService.addSession(session, host);	
});

export const deleteSessionAsync = createAsyncThunk(
  DELETE_SESSION,
	async (item) => {
		return await sessionService.deleteSession(item);
	}
);

export const updateStatusAsync = createAsyncThunk(
	UPDATE_STATUS,
	async (item) => {
		return await sessionService.updateStatus(item);
	}
);

export const addPlayerAsync = createAsyncThunk(
  ADD_PLAYER,
  async (session, player) => {
    return await sessionService.addPlayer()
  }
)

