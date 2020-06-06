import store from '../store/store';
import SpotifyService from '../utility/MusicServices/SpotifyService';

export const setProviderId = (providerId: string) => ({
  type: 'SET_PROVIDER_ID',
  providerId,
});

export const getProviderInstance = () => {
  return () => {
    const { providerId } = store.getState().providerReducer;

    if (providerId === 'Spotify') {
      return SpotifyService.getInstance();
    }
    
    return undefined;
  }
};