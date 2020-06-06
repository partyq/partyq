import {
    PlayerState,
    CrossfadeState,
} from 'react-native-spotify-remote';

export interface Track {
    trackUri: string,
    imageUri: string,
    artists: string,
    title: string,
    durationMs: number
}

export interface PlaylistDetails {
    playlistId: string,
    title: string,
    description: string,
    imageUri: string,
    totalTracks: number,
}

export interface UserProfile {
    displayName: string
}

export enum SearchType { 
    PLAYLIST = 'playlist', 
    TRACK = 'track' 
};

export type SearchResult = Track | PlaylistDetails;

export interface SpotifyCallbacks {
    onPlayerStateChanged: (playerState: PlayerState) => void
}

export type ServiceCallbacks =
    SpotifyCallbacks

interface _MusicService {
    authorize: () => void,
    getPartyPlayLists: () => Promise<PlaylistDetails[]>,
    getLibraryPlayLists: () => Promise<PlaylistDetails[]>,
    getSearchResults: (query: string, type: SearchType) => Promise<SearchResult[]>,
    getToken: () => string | undefined,
    setToken: (token: string) => void,
    playTrack: (id: string) => void,
    getTracks: (playlistId: string, pageNumber: number) => Promise<Track[]>,
    registerCallbacks: (callbacks: ServiceCallbacks) => void,
    resume: () => void,
    pause: () => void,
    next: () => void,
    previous: () => void,
    getUserProfile: () => Promise<UserProfile>,
    getTrack: (trackUri: string) => Promise<Track>,
    getPlayerState: () => Promise<PlayerState>,
    queueTrack: (trackUri: string) => Promise<void>,
    getCrossfadeState: () => Promise<CrossfadeState>,
}

export interface MusicService {
    new(): _MusicService,
    getInstance: () => _MusicService
};

export function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}