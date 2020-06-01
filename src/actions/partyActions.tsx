import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty
} from '../utility/backend';
import store from '../store/store';

export const SET_PARTY_ID = 'SET_PARTY_ID';

export const setPartyId = (id: string) => ({
    type: SET_PARTY_ID,
    id
})

export const createParty = (playListId: string, provider: any) => {
    return async (dispatch: Function): Promise<string> => {
       const {partyId, initialId} = await _createParty(playListId, provider);
       dispatch(setPartyId(partyId));
       return initialId;
    }
}

export const joinParty = () => {
    return async () => {
        const { id } = store.getState().partyReducer;
        const { username } = store.getState().userReducer;
        await _joinParty(id, username);
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
        const { id } = store.getState().partyReducer;
        await _endParty(id)
        dispatch(setPartyId(''));
    }
}