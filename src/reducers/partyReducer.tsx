import PartyState from '../states/partyState';
import {
    SET_PARTY_ID
} from '../actions/partyActions';

export const initialState: PartyState = {
    id: ''
};

const reducer = (state: PartyState = initialState, action: any) => {
    switch (action.type) {
        case SET_PARTY_ID:
            const { id } = action;
            console.log(id);
            return Object.assign({}, state, {
                id
            })
        default: 
            return state
    }
}

export default reducer;