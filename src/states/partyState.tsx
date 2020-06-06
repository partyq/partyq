import { 
    SongRequest, 
    SongVote, 
    PartyMember
} from "../utility/backend";

export default interface PartyState {
    partyId: string,
    docId: string,
    hostName: string,
    playlistId: string,
    token: string,
    requests: SongRequest[],
    votes: SongVote[],
    members: PartyMember[]
}