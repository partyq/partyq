export interface iInitialState {
  providerId: string
}

const initialState: iInitialState = {
  providerId: '',
};

const setProviderId = ( state: iInitialState = initialState, { providerId }: any) => {
  return Object.assign({}, state, { providerId });
};

const reducer = (state: iInitialState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_PROVIDER_ID': return setProviderId(state, action)
    default: return state
  }
}

export default reducer;