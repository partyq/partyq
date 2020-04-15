export enum PartyStatus {
    INVALID_ID,
    USER_ALREADY_EXISTS,
    UNKNOWN_ERROR,
    SUCCESS
}

export default interface PartyState {
    id: string,
    status: PartyStatus | null
}