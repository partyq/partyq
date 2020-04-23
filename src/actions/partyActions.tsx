import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty
} from '../utility/backend';
import store from '../store/store';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_PARTY_STATUS = 'SET_PARTY_STATUS';

export const setPartyId = (id: string) => ({
    type: SET_PARTY_ID,
    id
})

export const createParty = (playlistId: string, provider: any, callback: (() => void) | undefined) => {
    return (dispatch: Function) => {
        _createParty(playlistId, provider)
            .then(
                (partyId: string) => {
                    dispatch(setPartyId(partyId));
                    if (callback !== undefined) {
                        callback();
                    }
                }
            )
    }
}

export const joinParty = () => {
    return () => {
        const { party, user } = store.getState().reducer;
        _joinParty(party.id, user.username)
    }
}

export const leaveParty = () => {
    return (dispatch: Function) => {
        const { user } = store.getState().reducer;
        _leaveParty(user.username)
            .then(
                () => {
                    dispatch(setPartyId(''));
                }
            )
    }
}

export const endParty = () => {
    return (dispatch: Function) => {
        const { party } = store.getState().reducer;
        _endParty(party.id)
            .then(
                () => {
                    dispatch(setPartyId(''));
                }
            )
    }
}