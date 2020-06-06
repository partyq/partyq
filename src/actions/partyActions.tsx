import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty,
    changeDefaultPlayList as _changeDefaultPlayList
} from '../utility/backend';
import store from '../store/store';
import { PlaylistDetails } from 'src/utility/MusicServices/MusicService';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_DOC_ID = 'SET_DOC_ID';
export const SET_PLAYLIST_DETAILS = 'SET_PLAYLIST_DETAILS';

export const setPartyId = (partyId: string) => ({
    type: SET_PARTY_ID,
    partyId,
});

export const setDocId = (docId: string) => ({
    type: SET_DOC_ID,
    docId,
});

export const setPlaylistDetails = (playlistDetails: PlaylistDetails) => ({
    type: SET_PLAYLIST_DETAILS,
    playlistDetails,
})

export const createParty = (playlistDetails: PlaylistDetails, provider: any) => {
    return async (dispatch: Function): Promise<void> => {
        const {partyId, docId} = await _createParty(playlistDetails, provider);
        dispatch(setPartyId(partyId));
        dispatch(setDocId(docId));
    }
}

export const changeDefaultPlayList = (playListId: string, provider: any) => {
    return async () => {
        const { docId } = store.getState().partyReducer;
        await _changeDefaultPlayList(playListId, docId);
    }
}

export const joinParty = () => {
    return async () => {
        const { partyId } = store.getState().partyReducer;
        const { username } = store.getState().userReducer;
        await _joinParty(partyId, username);
    }
}

export const leaveParty = () => {
    return async (dispatch: Function) => {
        const { username } = store.getState().userReducer;
        await _leaveParty(username)
        dispatch(setPartyId(''));
    }
}

export const endParty = () => {
    return async (dispatch: Function) => {
        const { partyId } = store.getState().partyReducer;
        await _endParty(partyId)
        dispatch(setPartyId(''));
    }
}