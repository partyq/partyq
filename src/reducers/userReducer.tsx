import UserState from '../states/userState';
import {
    SET_USER
} from '../actions/userActions';

export const initialState: UserState = {
    user: {
        fullName: '',
        username: '',
        email: ''
    }
};

const userReducer = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            const {user} = action;
            return Object.assign({}, state, {
                user
            });
        default: 
            return state
    }
}

export default userReducer;