import { combineReducers } from "@reduxjs/toolkit"; // Use combineReducers from Redux Toolkit
import { AuthReducer } from "./AuthReducer";

const reducers = combineReducers({
  auth: AuthReducer,      // Register commonReducer under the key "common"
 
});

export default reducers;
