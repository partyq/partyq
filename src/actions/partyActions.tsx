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

export const createParty = (playlistId: string, provider: any, callback: ((initialId: string) => void) | undefined) => {
    return (dispatch: Function) => {
        _createParty(playlistId, provider)
            .then(
                ({partyId, initialId}) => {
                    dispatch(setPartyId(partyId));
                    if (callback !== undefined) {
                        callback(initialId);
                    }
                }
            )
    }
}

export const joinParty = (callback: ((error: string | null) => void) | undefined) => {
    return () => {
        const { id } = store.getState().partyReducer;
        const { username } = store.getState().userReducer;
        _joinParty(id, username)
            .then(
                () => {
                    if (callback !== undefined) {
                        callback(null);
                    }
                },
                (error: string) => {
                    if (callback !== undefined) {
                        callback(error);
                    }
                }
            )
    }
}

export const leaveParty = () => {
    return (dispatch: Function) => {
        const { username } = store.getState().userReducer;
        _leaveParty(username)
            .then(
                () => {
                    dispatch(setPartyId(''));
                }
            )
    }
}

export const endParty = () => {
    return (dispatch: Function) => {
        const { id } = store.getState().partyReducer;
        _endParty(id)
            .then(
                () => {
                    dispatch(setPartyId(''));
                }
            )
    }
}