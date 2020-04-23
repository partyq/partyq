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


export interface iPlayList {
  id: string,
  uri: string,
  image: string,
  title: string,
  numSongs: string,
};

export interface iTrack {
  id: string,
  image: string,
  artists: string,
  title: string,
}

export interface iPlayListDetails {
  id: string,
  title: string,
  description: string,
  tracks: iTrack[],
  image: string,
}

export interface iUserProfile {
  displayName: string
}

export enum SearchType { PLAYLIST = 'playlist', TRACK = 'track' };

export interface iSpotifyService {
  authorize: () => void,
  getPartyPlayLists: () => Promise<iPlayList[]>,
  getLibraryPlayLists: () => Promise<iPlayList[]>,
  getSearchResults: (query: string, type: SearchType) => Promise<iPlayList[]>,
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

  getToken = () => this._token;

  getPlayList = async( playListId: string ): Promise<iPlayListDetails> => {
    const URL = `https://api.spotify.com/v1/playlists/${playListId}`;
    const config = { 
      params: { fields: "description,name,images,tracks.items.track(name,album.images,artists,id)" }, 
      headers: { Authorization: `Bearer ${this._token}` },
    };
    const result = await axios.get(URL, config);

    const {id, name, description, images, tracks} = result.data;
    console.log(playListId);

    const parsedTracks: iTrack[] = [];

    tracks.items.forEach(({ track }: any) => {
      const {id, name, artists, album} = track;
      let stringOfArtists = '';

      for (const artist of artists) {
        stringOfArtists += `${artist.name},`;
      };
      const pos = stringOfArtists.lastIndexOf(',');

      parsedTracks.push({
        id,
        title: name,
        image: album.images ? album.images[0].url : undefined,
        artists: stringOfArtists.slice(0, pos),
      });
    });

    const playList: iPlayListDetails = {
      id,
      title: name,
      description,
      image: images ? images[0].url : undefined,
      tracks: parsedTracks,
    };

    return playList;
  };

  getUserProfile = async(): Promise<iUserProfile> => {
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
  getPartyPlayLists = async(): Promise<iPlayList[]> => {
    const playLists: iPlayList[] = [];
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
  getLibraryPlayLists = async(): Promise<iPlayList[]> => {
    const playLists: iPlayList[] = [];
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
  getSearchResults = async(query: string, type: SearchType): Promise<iPlayList[]> => {
    const playLists: iPlayList[] = [];
    const URL = 'https://api.spotify.com/v1/search';
    const config = { 
      params: { q: query, type }, 
      headers: { Authorization: `Bearer ${this._token}` },
    };
    const result = await axios.get(URL, config);

    result.data.playlists.items.forEach((item: any) => {
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