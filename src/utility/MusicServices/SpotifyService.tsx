import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig
} from 'react-native-spotify-remote';

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  IP,
  PORT
} from 'react-native-dotenv';

import axios from 'axios';


export interface iPlayLists {
  id: string,
  uri: string,
  image: string,
  title: string,
  numSongs: string,
};

export interface iSpotifyService {
  authorize: () => void,
  getFeaturedPlayLists: () => Promise<iPlayLists[]>,
  getLibraryPlayLists: () => Promise<iPlayLists[]>,
};

class SpotifyService implements iSpotifyService {

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
  }
  ;

  static getInstance = () => {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
      SpotifyService.instance._token = '';
    }
    return SpotifyService.instance;
  }

  authorize = async(): Promise<void> => {
    this._token = await SpotifyAuth.initialize(this._spotifyConfig);
  };

  /**
   * Get featured spotify playlists. Defaults to USA UTC time.
   */
  getFeaturedPlayLists = async(): Promise<iPlayLists[]> => {
    const playLists: iPlayLists[] = [];
    const URL = 'https://api.spotify.com/v1/browse/featured-playlists';
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

  getLibraryPlayLists = async(): Promise<iPlayLists[]> => {
    const playLists: iPlayLists[] = [];
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

};

export default SpotifyService;