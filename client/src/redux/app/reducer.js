import { createSlice } from "@reduxjs/toolkit";
import { LOCATION } from "../../util/constant";
import { REQUEST_STATE } from "../utils";

const INITIAL_STATE = {
  location: LOCATION.HOME
};

const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    resetApp: (state) => {
      state.location = LOCATION.HOME;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    }
  },
});

export const { resetApp, setLocation } = appSlice.actions;
export default appSlice.reducer;