import PartyState from '../states/partyState';
import {
    SET_PARTY_ID,
    SET_DOC_ID,
    SET_PLAYLIST_DETAILS
} from '../actions/partyActions';

export const initialState: PartyState = {
    partyId: '',
    docId: '',
    playlistDetails: undefined
};

const partyReducer = (state: PartyState = initialState, action: any) => {
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
            });
        case SET_PLAYLIST_DETAILS:
            const { playlistDetails } = action;
            return Object.assign({}, state, {
                playlistDetails
            })
        default: 
            return state
    }
}

export default partyReducer;