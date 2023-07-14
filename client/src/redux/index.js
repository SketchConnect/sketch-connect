import { combineReducers } from "redux";
import session from "./session/reducer";
import user from "./user/reducer";

const rootReducer = combineReducers({
	session,
	user,
});

export default rootReducer;