import { 
    SongRequest, 
    SongVote, 
    PartyMember
} from "../utility/backend";
import { PlaylistDetails, PlaylistTracks } from "src/utility/MusicServices/MusicService";

export default interface PartyState {
    partyId: string,
    docId: string,
    hostName: string,
    token: string,
    created: Date | null,
    requests: SongRequest[],
    votes: SongVote[],
    members: PartyMember[]
    playlistDetails: PlaylistDetails | undefined,
    playlistTracks: PlaylistTracks | undefined,
    pageNumber: number,
    requestsThreshold: number | null,
    queueByVoteCount: boolean,
    allowLibraryRequests: boolean
}