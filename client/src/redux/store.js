import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducer";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  devTools: true,
});
