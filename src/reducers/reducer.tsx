import State from '../states/state';
import {
  initialState as partyInitialState
} from './partyReducer';
import {
  initialState as userInitialState
} from './userReducer';
import { SET_PROVIDER_ID, SET_LISTENERS } from '../actions';

const initialState: State = {
  providerId: '',
  listeners: [],
  user: userInitialState,
  party: partyInitialState
};

const setProviderId = ( state: State = initialState, { providerId }: any) => {
  return Object.assign({}, state, { providerId });
};

const setListeners = (state: State = initialState, action: any) => {
  const { listeners } = action;
  return Object.assign({}, state, {
    listeners
  })
}

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case SET_PROVIDER_ID: return setProviderId(state, action)
    case SET_LISTENERS: return setListeners(state, action)
    default: return state
  }
}

export default reducer;