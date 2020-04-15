import {
    createParty as _createParty,
    joinParty as _joinParty,
    leaveParty as _leaveParty,
    endParty as _endParty
} from '../utility/backend';
import {
    PartyStatus
} from '../states/partyState';
import store from '../store/store';

export const SET_PARTY_ID = 'SET_PARTY_ID';
export const SET_PARTY_STATUS = 'SET_PARTY_STATUS';

export const setPartyId = (id: string) => ({
    type: SET_PARTY_ID,
    id
})

export const setPartyStatus = (status: PartyStatus | null) => ({
    type: SET_PARTY_STATUS,
    status
});

export const createParty = (playlistId: string) => {
    return (dispatch: Function) => {
        _createParty(playlistId)
            .then(
                (partyId: string) => {
                    dispatch(setPartyStatus(PartyStatus.SUCCESS));
                    dispatch(setPartyId(partyId));
                    console.log(partyId);
                }
            )
    }
}

export const joinParty = () => {
    return (dispatch: Function) => {
        const { party, user } = store.getState().reducer;
        _joinParty(party.id, user.username)
            .then(
                () => {
                    dispatch(setPartyStatus(PartyStatus.SUCCESS));
                    console.log(party.id);
                },
                (status: PartyStatus) => {
                    dispatch(setPartyStatus(status));
                    console.log(status);
                }
            )
    }
}

export const leaveParty = () => {
    return (dispatch: Function) => {
        const { user } = store.getState().reducer;
        _leaveParty(user.username)
            .then(
                () => {
                    dispatch(setPartyId(''));
                    dispatch(setPartyStatus(null));
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
                    dispatch(setPartyStatus(null));
                }
            )
    }
}