import { createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./service";
import {
	ADD_SESSION,
  DELETE_SESSION,
	UPDATE_STATUS,
	SET_CURRENT_SESSION,
} from "../utils";

export const addSessionAsync = createAsyncThunk(
  ADD_SESSION, 
  async () => {
    //return await sessionService.getInventory();	
});

export const deleteSessionAsync = createAsyncThunk(
  DELETE_SESSION,
	async (item) => {
		//return await sessionService.addInventory(item);
	}
);

export const updateStatusAsync = createAsyncThunk(
	UPDATE_STATUS,
	async (item) => {
		//return await sessionService.deleteInventory(item);
	}
);

export const setCurrentSessionAsync = createAsyncThunk(
	SET_CURRENT_SESSION,
	async (item) => {
		//return await sessionService.editInventory(item);
	}
);
