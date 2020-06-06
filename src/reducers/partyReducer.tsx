import PartyState from '../states/partyState';
import {
    SET_PARTY_ID,
    SET_DOC_ID,
    SET_PARTY,
    SET_SONG_REQUESTS,
    SET_REQUEST_VOTES,
    SET_PARTY_MEMBERS,
    SET_PLAYLIST_DETAILS
} from '../actions/partyActions';

export const initialState: PartyState = {
    partyId: '',
    docId: '',
    hostName: '',
    playlistId: '',
    token: '',
    requests: [],
    votes: [],
    members: [],
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
        case SET_PARTY:
            const { party } = action;
            return Object.assign({}, state, {
                partyId: party.id,
                hostName: party.hostName,
                playlistId: party.playlistId,
                token: party.token
            });
        case SET_SONG_REQUESTS:
            const { requests } = action;
            return Object.assign({}, state, {
                requests
            });
        case SET_REQUEST_VOTES:
            const { votes } = action;
            return Object.assign({}, state, {
                votes
            });
        case SET_PARTY_MEMBERS:
            const { members } = action;
            return Object.assign({}, state, {
                members
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