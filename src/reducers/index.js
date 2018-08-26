import { combineReducers } from "redux";
import gituserReducer from './gituserReducer';

export default combineReducers({
  repos:gituserReducer
});