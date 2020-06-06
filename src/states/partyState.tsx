import { 
    SongRequest, 
    SongVote, 
    PartyMember
} from "../utility/backend";
import { PlaylistDetails } from "src/utility/MusicServices/MusicService";

export default interface PartyState {
    partyId: string,
    docId: string,
    hostName: string,
    playlistId: string,
    token: string,
    requests: SongRequest[],
    votes: SongVote[],
    members: PartyMember[]
    playlistDetails: PlaylistDetails | undefined
}