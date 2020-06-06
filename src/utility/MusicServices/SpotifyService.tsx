import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
  SpotifySession,
  RepeatMode
} from 'react-native-spotify-remote';
import {
  // @ts-ignore
  SPOTIFY_CLIENT_ID,
  // @ts-ignore
  SPOTIFY_REDIRECT_URL,
  // @ts-ignore
  SPOTIFY_DEBUG_REFRESH_TOKEN,
  // @ts-ignore
  IP,
  // @ts-ignore
  PORT
} from 'react-native-dotenv';
import axios from 'axios';
import qs from 'qs';
import DeviceInfo from 'react-native-device-info';

import {
  MusicService,
  staticImplements,
  PlaylistDetails,
  Track,
  UserProfile,
  SearchType,
  SearchResult,
  SpotifyCallbacks
} from './MusicService';

@staticImplements<MusicService>()
class SpotifyService {

  private static instance: SpotifyService;
  private _session: SpotifySession;
  private _spotifyConfig: ApiConfig;

  constructor() {
    this._spotifyConfig = {
      clientID: SPOTIFY_CLIENT_ID,
      redirectURL: SPOTIFY_REDIRECT_URL,
      tokenRefreshURL: `http://${IP}:${PORT}/refresh`,
      tokenSwapURL: `http://${IP}:${PORT}/swap`,
      scopes: [ApiScope.AppRemoteControlScope, ApiScope.PlaylistReadPrivateScope]
    };
    this._session = {
      accessToken: '',
      refreshToken: '',
      expirationDate: '',
      scope: ApiScope.AppRemoteControlScope,
      expired: false,
    };
  };

  static getInstance = () => {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  authorize = async(): Promise<void> => {
    if (await DeviceInfo.isEmulator()) {
      const debugAuthResult = await axios.post(
        `http://${IP}:${PORT}/refresh`, 
        qs.stringify({
          refresh_token: SPOTIFY_DEBUG_REFRESH_TOKEN
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      this._session = {
        ...this._session,
        accessToken: debugAuthResult.data.access_token,
        refreshToken: debugAuthResult.data.refresh_token
      };
    } else {
      try {
        await SpotifyRemote.disconnect();
        await SpotifyAuth.endSession();

        this._session = await SpotifyAuth.authorize(this._spotifyConfig);
        await SpotifyRemote.connect(this._session.accessToken);
      }
      catch(error) {
        console.warn(error)
        throw 'Please try again'
      }
    }
  };

  getToken = () => this._session?.accessToken;

  setToken = (token: string) => {
    if (this._session) {
      this._session.accessToken = token;
    }
    else {
      this._session = {
        accessToken: token,
        refreshToken: '',
        expirationDate: '',
        scope: ApiScope.AppRemoteControlScope,
        expired: false,
      }
    }
  };

  playTrack = (id: string) => SpotifyRemote.playUri(`spotify:track:${id}`)

  registerCallbacks = (callbacks: SpotifyCallbacks): void => {
    SpotifyRemote.on('playerStateChanged', callbacks.onPlayerStateChanged)
  }

  resume = () => SpotifyRemote.resume()

  pause = () => SpotifyRemote.pause()

  next = () => SpotifyRemote.skipToNext()

  previous = () => SpotifyRemote.skipToPrevious()

  private parseTracks = (tracks: any[]): Track[] => {
    const parsedTracks: Track[] = [];

    tracks.forEach(({ track }: any) => {
      const {id, name, artists, album, duration_ms} = track;
      let stringOfArtists = '';

      for (const artist of artists) {
        stringOfArtists += `${artist.name}, `;
      };
      const pos = stringOfArtists.lastIndexOf(',');

      parsedTracks.push({
        trackUri: id,
        title: name,
        imageUri: album.images ? album.images[0].url : undefined,
        artists: stringOfArtists.slice(0, pos),
        durationMs: duration_ms
      });
    });

    return parsedTracks;
  }

  getUserProfile = async(): Promise<UserProfile> => {
    const URL = 'https://api.spotify.com/v1/me';
    const config = { headers: { Authorization: `Bearer ${this._session.accessToken}` } };
    const result = (await axios.get(URL, config)).data;
    return {
      displayName: result.display_name
    };
  }

  /**
   * Get featured spotify playlists. Defaults to USA UTC time.
   */
  getPartyPlayLists = async(): Promise<PlaylistDetails[]> => {
    const playLists: PlaylistDetails[] = [];
    const URL = 'https://api.spotify.com/v1/browse/categories/party/playlists';
    const config = { headers: { Authorization: `Bearer ${this._session.accessToken}` } };
    const result = await axios.get(URL, config);


    result.data.playlists.items.forEach((item: any) => {
      playLists.push({
        playlistId: item.id,
        imageUri: item.images.length ? item.images[0].url : undefined,
        title: item.name,
        totalTracks: Number(item.tracks.total),
        description: item.description,
      });
    });
        
    return playLists;
  };

  /**
   * Get users library playlists.
   */
  getLibraryPlayLists = async(): Promise<PlaylistDetails[]> => {
    const playLists: PlaylistDetails[] = [];
    const URL = 'https://api.spotify.com/v1/me/playlists';
    const config = { headers: { Authorization: `Bearer ${this._session.accessToken}` } };
    const result = await axios.get(URL, config);

    result.data.items.forEach((item: any) => {
      playLists.push({
        playlistId: item.id,
        title: item.name,
        description: item.description,
        imageUri: item.images.length ? item.images[0].url : null,
        totalTracks: Number(item.tracks.total),
      });
    });

    return playLists;
  }

  /**
   * Search playlists.
   */
  getSearchResults = async(query: string, type: SearchType): Promise<SearchResult[]> => {
    const searchResults: SearchResult[] = [];
    const URL = 'https://api.spotify.com/v1/search';
    const config = { 
      params: { q: query, type }, 
      headers: { Authorization: `Bearer ${this._session.accessToken}` },
    };
    const result = await axios.get(URL, config);

    result.data.playlists.items.forEach((item: any) => {
      searchResults.push({
        playlistId: item.id,
        imageUri: item.images.length ? item.images[0].url : null,
        title: item.name,
        description: item.description,
        totalTracks: Number(item.tracks.total)
      });
    });

    return searchResults;
  }

  getTrack = async(trackUri: string): Promise<Track> => {
    const URL = `https://api.spotify.com/v1/tracks/${trackUri}`;
    const config = { headers: { Authorization: `Bearer ${this._session.accessToken}` } };
    const result = await axios.get(URL, config);

    const trackData = result.data;

    return this.parseTracks([{track: trackData}])[0];
  };

  getTracks = async( playListId: string, pageNumber: number ): Promise<Track[]> => {
    const limit = 10;
    const offset = pageNumber * limit;
    const URL = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
    const config = { 
      params: {
        fields: "items.track(name,album.images,artists,id,duration_ms)",
        limit,
        offset,
      }, 
      headers: { Authorization: `Bearer ${this._session.accessToken}` },
    };
    const result = await axios.get(URL, config);

    return this.parseTracks(result.data.items);
  };

  queueTrack = (trackUri: string) => SpotifyRemote.queueUri(`spotify:track:${trackUri}`)

  getPlayerState = () => SpotifyRemote.getPlayerState()

  getCrossfadeState = () => SpotifyRemote.getCrossfadeState()

};

export default SpotifyService;