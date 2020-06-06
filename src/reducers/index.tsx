import { combineReducers } from 'redux';

import miscReducer from './miscReducer';
import partyReducer from './partyReducer';
import userReducer from './userReducer';

export default combineReducers({
  miscReducer,
  partyReducer,
  userReducer
});