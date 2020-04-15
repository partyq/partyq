import UserState from '../states/userState';
import {
    SET_USER_NAME
} from '../actions/userActions';

export const initialState: UserState = {
    username: ''
};

const reducer = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_NAME:
            const {username} = action;
            return Object.assign({}, state, {
                username
            });
        default: 
            return state
    }
}

export default reducer;