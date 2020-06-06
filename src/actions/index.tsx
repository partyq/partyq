import store from '../store/store';
import SpotifyService from '../utility/MusicServices/SpotifyService';

export const SET_PROVIDER_ID = 'SET_PROVIDER_ID';
export const SET_LISTENERS = 'SET_LISTENERS';

export const setProviderId = (providerId: string) => ({
  type: SET_PROVIDER_ID,
  providerId,
});

export const setListeners = (listeners: (() => any)[]) => ({
  type: SET_LISTENERS,
  listeners
});

export const getProviderInstance = () => {
  return () => {
    const { providerId } = store.getState().reducer;

    if (providerId === 'Spotify') {
      return SpotifyService.getInstance();
    }
    
    return undefined;
  }
};