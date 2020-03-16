const initialState = {
  token: 'hi',
};

const setToken = (state, { token }) => {
  return Object.assign({}, state, { token });
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN': return setToken(state, action)
    default: return state
  }
}

export default auth;