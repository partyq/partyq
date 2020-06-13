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
import { PlaylistDetails, Track } from '../utility/MusicServices/MusicService';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_DOC_ID = 'SET_DOC_ID';
export const SET_PARTY = 'SET_PARTY';
export const SET_SONG_REQUESTS = 'SET_SONG_REQUESTS';
export const SET_REQUEST_VOTES = 'SET_REQUEST_VOTES';
export const SET_PARTY_MEMBERS = 'SET_PARTY_MEMBERS';
export const SET_PLAYLIST_DETAILS = 'SET_PLAYLIST_DETAILS';
export const APPEND_PLAYLIST_TRACKS = 'APPEND_TRACKS';
export const SET_PLAYLIST_TRACKS = 'SET_TRACKS'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const SET_REQUEST_THRESHOLD = 'SET_REQUEST_THRESHOLD';
export const SET_QUEUE_BY_VOTE_COUNT = 'SET_QUEUE_BY_VOTE_COUNT';
export const SET_ALLOW_LIBRARY_REQUESTS = 'SET_ALLOW_LIBRARY_REQUESTS';

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

export const setPlaylistDetails = (playlistDetails: PlaylistDetails | undefined) => ({
    type: SET_PLAYLIST_DETAILS,
    playlistDetails,
});

export const setPlaylistTracks = (tracksToSet: Track[] | undefined) => {
    console.log({tracksToSet: tracksToSet === undefined})
    return {
            type: SET_PLAYLIST_TRACKS,
            tracksToSet,
        }
};

export const appendPlaylistTracks = (tracksToAppend: Track[]) => ({
    type: APPEND_PLAYLIST_TRACKS,
    tracksToAppend,
});

export const setPageNumber = (pageNumber: number) => ({
    type: SET_PAGE_NUMBER,
    pageNumber,
})
export const setRequestThreshold = (threshold: number | null) => ({
    type: SET_REQUEST_THRESHOLD,
    threshold
});

export const setQueueByVoteCount = (queueByVoteCount: boolean) => ({
    type: SET_QUEUE_BY_VOTE_COUNT,
    queueByVoteCount
});

export const setAllowLibraryRequests = (allow: boolean) => ({
    type: SET_ALLOW_LIBRARY_REQUESTS,
    allow
});

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