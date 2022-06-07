import {combineReducers} from "redux";
import authReducer from "./authReducer";
import loadDelayReducer from "./loadDelayReducer";

const rootReducer = combineReducers({
    authReducer,
    loadDelayReducer
});

export default rootReducer;