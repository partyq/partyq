import PartyState from '../states/partyState';
import {
    SET_PARTY_ID,
    SET_PARTY_STATUS
} from '../actions/partyActions';

export const initialState: PartyState = {
    id: '',
    status: null
};

const reducer = (state: PartyState = initialState, action: any) => {
    switch (action.type) {
        case SET_PARTY_STATUS:
            const {status, message} = action;
            return Object.assign({}, state, {
                status, message
            });
        case SET_PARTY_ID:
            const {partyId} = action;
            return Object.assign({}, state, {
                id: partyId
            })
        default: 
            return state
    }
}

export default reducer;