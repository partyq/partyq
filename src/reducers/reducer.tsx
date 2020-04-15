import State from '../states/state';
import {
  initialState as partyInitialState
} from './partyReducer';
import {
  initialState as userInitialState
} from './userReducer';

const initialState: State = {
  providerId: '',
  user: userInitialState,
  party: partyInitialState
};

const setProviderId = ( state: State = initialState, { providerId }: any) => {
  return Object.assign({}, state, { providerId });
};

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case 'SET_PROVIDER_ID': return setProviderId(state, action)
    default: return state
  }
}

export default reducer;