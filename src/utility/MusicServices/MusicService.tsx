import {
    PlayerState
} from 'react-native-spotify-remote';

export interface PlayList {
    id: string,
    uri: string,
    image: string,
    title: string,
    numSongs: string,
};

export interface Track {
    id: string,
    image: string,
    artists: string,
    title: string,
    durationMs: number
}

export interface PlayListDetails {
    id: string,
    title: string,
    description: string,
    tracks: Track[],
    image: string,
}

export interface UserProfile {
    displayName: string
}

export enum SearchType { 
    PLAYLIST = 'playlist', 
    TRACK = 'track' 
};

export type SearchResult = 
    Track |
    PlayList;

export interface SpotifyCallbacks {
    onPlayerStateChanged: (playerState: PlayerState) => void
}

export type ServiceCallbacks =
    SpotifyCallbacks

interface _MusicService {
    authorize: () => void,
    getPartyPlayLists: () => Promise<PlayList[]>,
    getLibraryPlayLists: () => Promise<PlayList[]>,
    getSearchResults: (query: string, type: SearchType) => Promise<SearchResult[]>,
    getToken: () => string | undefined,
    setToken: (token: string) => void,
    getPlayList: (playlistId: string) => Promise<PlayListDetails>,
    playTrack: (id: string) => void,
    registerCallbacks: (callbacks: ServiceCallbacks) => void,
    resume: () => void,
    pause: () => void,
    next: () => void,
    previous: () => void,
    getUserProfile: () => Promise<UserProfile>,
    getTrack: (id: string) => Promise<Track>
}

export interface MusicService {
    new(): _MusicService,
    getInstance: () => _MusicService
};

export function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}