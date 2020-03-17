export interface iInitialState {
  token: string
}

const initialState: iInitialState = {
  token: '',
};

const setToken = ( state: iInitialState = initialState, { token }: any) => {
  return Object.assign({}, state, { token });
}

const auth = (state: iInitialState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_TOKEN': return setToken(state, action)
    default: return state
  }
}

export default auth;