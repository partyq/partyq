import PartyState from '../states/partyState';
import {
    SET_PARTY_ID,
    SET_DOC_ID,
    SET_PARTY,
    SET_SONG_REQUESTS,
    SET_REQUEST_VOTES,
    SET_PARTY_MEMBERS,
    SET_PLAYLIST_DETAILS,
    SET_PAGE_NUMBER,
    SET_PLAYLIST_TRACKS,
    SET_REQUEST_THRESHOLD,
    SET_QUEUE_BY_VOTE_COUNT,
    SET_ALLOW_LIBRARY_REQUESTS
} from '../actions/partyActions';

export const initialState: PartyState = {
    partyId: '',
    docId: '',
    hostName: '',
    token: '',
    created: null,
    requests: [],
    votes: [],
    members: [],
    playlistDetails: undefined,
    playlistTracks: undefined,
    pageNumber: 1,
    requestsThreshold: null,
    queueByVoteCount: false,
    allowLibraryRequests: false
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
                playlistDetails: party.playlistDetails,
                token: party.token,
                created: party.created.toDate()
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
            console.warn("playlistDetails", playlistDetails)
            return Object.assign({}, state, {
                playlistDetails
            });
        case SET_PLAYLIST_TRACKS:
            const { tracksToAppend } = action;
            const {tracks, tracksLeftToFetch} = tracksToAppend;
            const newTracks = tracksToAppend !== undefined ? {
                tracks: state.playlistTracks?.tracks !== undefined ? [...state.playlistTracks.tracks, ...tracks] : tracks,
                tracksLeftToFetch,
            } : undefined;
            return Object.assign({}, state, {
                playlistTracks: newTracks
            });
        case SET_PAGE_NUMBER:
            const { pageNumber } = action;
            return Object.assign({}, state, {
                pageNumber
            });
        case SET_REQUEST_THRESHOLD:
            const { threshold } = action;
            return Object.assign({}, state, {
                requestsThreshold: threshold
            });
        case SET_QUEUE_BY_VOTE_COUNT:
            const { queueByVoteCount } = action;
            return Object.assign({}, state, {
                queueByVoteCount
            });
        case SET_ALLOW_LIBRARY_REQUESTS:
            const { allow } = action;
            return Object.assign({}, state, {
                allowLibraryRequests: allow
            });
        default: 
            return state
    }
}

export default partyReducer;