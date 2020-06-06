import UserState from './userState';
import PartyState from './partyState';

export default interface State {
    providerId: string,
    listeners: (() => any)[],
    user: UserState,
    party: PartyState
}