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

export interface iSpotifyService {
  authorize: () => void,
}

class SpotifyService implements iSpotifyService {

  private static instance: SpotifyService;
  private _token: string;
  private _spotifyConfig: ApiConfig;

  constructor() {
    this._token = '';
    this._spotifyConfig = {
      clientID: SPOTIFY_CLIENT_ID,
      redirectURL: SPOTIFY_REDIRECT_URL,
      tokenRefreshURL: `http://${IP}:${PORT}/refresh`,
      tokenSwapURL: `http://${IP}:${PORT}/swap`,
      scope: ApiScope.AppRemoteControlScope | ApiScope.PlaylistReadPrivateScope
    };
  }

  static getInstance = () => {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  authorize = async() => {
    console.log('authorize')
    this._token = await SpotifyAuth.initialize(this._spotifyConfig);
  }
};

export default SpotifyService;