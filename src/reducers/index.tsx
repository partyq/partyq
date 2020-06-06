import { combineReducers } from 'redux';

import providerReducer from './providerReducer';
import partyReducer from './partyReducer';
import userReducer from './userReducer';

export default combineReducers({
  providerReducer,
  partyReducer,
  userReducer
});