import { PlaylistDetails } from "src/utility/MusicServices/MusicService";

export default interface PartyState {
    partyId: string,
    docId: string,
    playlistDetails: PlaylistDetails | undefined
}