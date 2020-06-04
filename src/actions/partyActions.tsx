import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty,
    setDefaultPlayList as _setDefaultPlayList
} from '../utility/backend';
import store from '../store/store';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_DOC_ID = 'SET_DOC_ID';

export const setPartyId = (partyId: string) => ({
    type: SET_PARTY_ID,
    partyId
});

export const setDocId = (docId: string) => ({
    type: SET_DOC_ID,
    docId
})

export const createParty = (playListId: string, provider: any) => {
    return async (dispatch: Function): Promise<void> => {
        const {partyId, docId} = await _createParty(playListId, provider);
        dispatch(setPartyId(partyId));
        dispatch(setDocId(docId));
    }
}

export const setDefaultPlayList = (playListId: string, provider: any) => {
    return async () => {
        const { partyId, docId } = store.getState().partyReducer;
        await _setDefaultPlayList(playListId, partyId, docId, provider);
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