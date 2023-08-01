import { combineReducers } from "redux";
import session from "./session/reducer";
import user from "./user/reducer";
import app from "./app/reducer";

const rootReducer = combineReducers({
	session,
	user,
  app,
});

export default rootReducer;