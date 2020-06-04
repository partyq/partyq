import PartyState from '../states/partyState';
import {
    SET_PARTY_ID,
    SET_DOC_ID,
} from '../actions/partyActions';

export const initialState: PartyState = {
    partyId: '',
    docId: '',
};

const reducer = (state: PartyState = initialState, action: any) => {
    switch (action.type) {
        case SET_PARTY_ID:
            const { partyId } = action;
            return Object.assign({}, state, {
                partyId
            });
        case SET_DOC_ID:
            const { docId } = action;
            return Object.assign({}, state, {
                docId
            }) 
        default: 
            return state
    }
}

export default reducer;