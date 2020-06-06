import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty,
    changeDefaultPlayList as _changeDefaultPlayList,
    addPartyListener,
    Party,
    SongRequest,
    SongVote,
    addSongRequest,
    addPartyMembersListener,
    PartyMember,
    addSongRequestsListener,
    addVotesListener
} from '../utility/backend';
import store from '../store/store';
import { setListeners } from '.';
import { PlaylistDetails } from '../utility/MusicServices/MusicService';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_DOC_ID = 'SET_DOC_ID';
export const SET_PARTY = 'SET_PARTY';
export const SET_SONG_REQUESTS = 'SET_SONG_REQUESTS';
export const SET_REQUEST_VOTES = 'SET_REQUEST_VOTES';
export const SET_PARTY_MEMBERS = 'SET_PARTY_MEMBERS';
export const SET_PLAYLIST_DETAILS = 'SET_PLAYLIST_DETAILS';

export const setPartyId = (partyId: string) => ({
    type: SET_PARTY_ID,
    partyId,
});

export const setDocId = (docId: string) => ({
    type: SET_DOC_ID,
    docId
});

export const setParty = (party: Party) => ({
    type: SET_PARTY,
    party
});

export const setSongRequests = (requests: SongRequest[]) => ({
    type: SET_SONG_REQUESTS,
    requests
});

export const setRequestVotes = (votes: SongVote[]) => ({
    type: SET_REQUEST_VOTES,
    votes
});

export const setPartyMembers = (members: PartyMember[]) => ({
    type: SET_PARTY_MEMBERS,
    members
});

export const setPlaylistDetails = (playlistDetails: PlaylistDetails) => ({
    type: SET_PLAYLIST_DETAILS,
    playlistDetails,
})

const startPartyReduxListeners = (partyId: string) => {
    return (dispatch: Function) => {
        const partyListener = addPartyListener(partyId, 
            (party: Party) => {
                dispatch(setParty(party));
            }
        );
        const membersListener = addPartyMembersListener(partyId, 
            (members: PartyMember[]) => {
                dispatch(setPartyMembers(members));
            }
        );
        const requestsListener = addSongRequestsListener(partyId, 
            (requests: SongRequest[]) => {
                dispatch(setSongRequests(requests));
            }
        );
        const votesListener = addVotesListener(partyId, 
            (votes: SongVote[]) => {
                dispatch(setRequestVotes(votes));
            }
        );
        dispatch(setListeners([
            partyListener,
            membersListener,
            requestsListener,
            votesListener
        ]));
    }
}

export const createParty = (playlistDetails: PlaylistDetails, provider: any) => {
    return async (dispatch: Function): Promise<void> => {
        const {partyId, docId} = await _createParty(playlistDetails, provider);
        dispatch(setPartyId(partyId));
        dispatch(setDocId(docId));
        dispatch(startPartyReduxListeners(partyId));
    }
}

export const changeDefaultPlayList = (playListId: string, provider: any) => {
    return async () => {
        const { docId } = store.getState().partyReducer;
        await _changeDefaultPlayList(playListId, docId);
    }
}

export const joinParty = () => {
    return async (dispatch: Function) => {
        const { partyId } = store.getState().partyReducer;
        const { username } = store.getState().userReducer;
        await _joinParty(partyId, username);
        dispatch(startPartyReduxListeners(partyId));
    }
}

export const leaveParty = () => {
    return async (dispatch: Function) => {
        const { username } = store.getState().userReducer;
        await _leaveParty(username)
        dispatch(setParty({
            id: '',
            hostName: '',
            playlistId: '',
            token: '',
            created: new Date()
        }));
        dispatch(setDocId(''));
    }
}

export const endParty = () => {
    return async (dispatch: Function) => {
        const { partyId } = store.getState().partyReducer;
        await _endParty(partyId)
        dispatch(setParty({
            id: '',
            hostName: '',
            playlistId: '',
            token: '',
            created: new Date()
        }));
        dispatch(setDocId(''));
    }
}

export const requestSong = (id: string) => {
    return async () => {
        const state = store.getState();
        const { partyId } = state.partyReducer;
        const { username } = state.userReducer;
        await addSongRequest(id, partyId, username);
    }
}