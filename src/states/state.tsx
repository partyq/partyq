import UserState from './userState';
import PartyState from './partyState';

export default interface State {
    providerId: string,
    user: UserState,
    party: PartyState
}