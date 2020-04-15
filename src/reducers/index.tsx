import { combineReducers } from 'redux';

import reducer from './reducer';
import partyReducer from './partyReducer';
import userReducer from './userReducer';

export default combineReducers({
  reducer,
  partyReducer,
  userReducer
});