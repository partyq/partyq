import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig
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
  PlayList,
  PlayListDetails,
  Track,
  UserProfile,
  SearchType,
  SearchResult,
  SpotifyCallbacks
} from './MusicService';

@staticImplements<MusicService>()
class SpotifyService {

  private static instance: SpotifyService;
  private _token: string | undefined;
  private _spotifyConfig: ApiConfig;

  constructor() {
    this._spotifyConfig = {
      clientID: SPOTIFY_CLIENT_ID,
      redirectURL: SPOTIFY_REDIRECT_URL,
      tokenRefreshURL: `http://${IP}:${PORT}/refresh`,
      tokenSwapURL: `http://${IP}:${PORT}/swap`,
      scope: ApiScope.AppRemoteControlScope | ApiScope.PlaylistReadPrivateScope
    };
  };

  static getInstance = () => {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
      SpotifyService.instance._token = '';
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
      this._token = debugAuthResult.data.access_token;
    } else {
      this._token = await SpotifyAuth.initialize(this._spotifyConfig);
      SpotifyRemote.connect(this._token);
    }
  };

  getToken = () => this._token;

  setToken = (token: string) => this._token = token;

  getPlayList = async( playListId: string ): Promise<PlayListDetails> => {
    const URL = `https://api.spotify.com/v1/playlists/${playListId}`;
    const config = { 
      params: { fields: "description,name,images,tracks.items.track(name,album.images,artists,id)" }, 
      headers: { Authorization: `Bearer ${this._token}` },
    };
    const result = await axios.get(URL, config);

    const {id, name, description, images, tracks} = result.data;
    console.log(playListId);

    const parsedTracks = this.parseTracks(tracks.items);

    const playList: PlayListDetails = {
      id,
      title: name,
      description,
      image: images ? images[0].url : undefined,
      tracks: parsedTracks,
    };

    return playList;
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
        id,
        title: name,
        image: album.images ? album.images[0].url : undefined,
        artists: stringOfArtists.slice(0, pos),
        durationMs: duration_ms
      });
    });

    return parsedTracks;
  }

  getUserProfile = async(): Promise<UserProfile> => {
    const URL = 'https://api.spotify.com/v1/me';
    const config = { headers: { Authorization: `Bearer ${this._token}` } };
    const result = (await axios.get(URL, config)).data;
    return {
      displayName: result.display_name
    };
  }

  /**
   * Get featured spotify playlists. Defaults to USA UTC time.
   */
  getPartyPlayLists = async(): Promise<PlayList[]> => {
    const playLists: PlayList[] = [];
    const URL = 'https://api.spotify.com/v1/browse/categories/party/playlists';
    const config = { headers: { Authorization: `Bearer ${this._token}` } };
    const result = await axios.get(URL, config);

    result.data.playlists.items.forEach((item: any) => {
      playLists.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : undefined,
        title: item.name,
        numSongs: item.tracks.total,
      });
    });
    
    return playLists;
  };

  /**
   * Get users library playlists.
   */
  getLibraryPlayLists = async(): Promise<PlayList[]> => {
    const playLists: PlayList[] = [];
    const URL = 'https://api.spotify.com/v1/me/playlists';
    const config = { headers: { Authorization: `Bearer ${this._token}` } };
    const result = await axios.get(URL, config);

    result.data.items.forEach((item: any) => {
      playLists.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : null,
        title: item.name,
        numSongs: item.tracks.total,
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
      headers: { Authorization: `Bearer ${this._token}` },
    };
    const result = await axios.get(URL, config);

    result.data.playlists.items.forEach((item: any) => {
      searchResults.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : null,
        title: item.name,
        numSongs: item.tracks.total,
      });
    });

    return searchResults;
  }

  getTrack = async (id: string): Promise<Track> => {
    const URL = `https://api.spotify.com/v1/tracks/${id}`;
    const config = { headers: { Authorization: `Bearer ${this._token}` } };
    const result = await axios.get(URL, config);

    const trackData = result.data;

    return this.parseTracks([{track: trackData}])[0];
  }

};

export default SpotifyService;