import { 
    SongRequest, 
    SongVote, 
    PartyMember
} from "../utility/backend";
import { PlaylistDetails, Track } from "src/utility/MusicServices/MusicService";

export default interface PartyState {
    partyId: string,
    docId: string,
    hostName: string,
    playlistId: string,
    token: string,
    created: Date | null,
    requests: SongRequest[],
    votes: SongVote[],
    members: PartyMember[]
    playlistDetails: PlaylistDetails | undefined,
    playlistTracks: Track[] | undefined,
    pageNumber: number,
    requestsThreshold: number | null,
    queueByVoteCount: boolean,
}