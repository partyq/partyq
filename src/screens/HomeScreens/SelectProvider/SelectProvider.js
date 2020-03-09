/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
} from 'react-native-spotify-remote';

import axios from 'axios';

import { withTheme } from 'react-native-paper';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { Services } from '../../../config/RenderableData';

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  TOKEN_REFRESH_URL,
  TOKEN_SWAP_URL
} from 'react-native-dotenv'


// Api Config object, replace with your own applications client id and urls
const spotifyConfig = {
  clientID: SPOTIFY_CLIENT_ID,
  redirectURL: SPOTIFY_REDIRECT_URL,
	tokenRefreshURL: TOKEN_REFRESH_URL,
	tokenSwapURL: TOKEN_SWAP_URL,
  scope: ApiScope.AppRemoteControlScope | ApiScope.UserFollowReadScope,
};

const SelectProvider = (props) => {
  const styles = jsx(props.theme);

  // Initialize the library and connect the Remote
  // then play an epic song
  const playEpicSong = async() => {
    try {
      console.debug(spotifyConfig)
      const token = await SpotifyAuth.initialize(spotifyConfig);
      console.debug('token accquired');
      await SpotifyRemote.connect(token);
      console.debug('connected')
      await remote.playUri("spotify:track:6IA8E2Q5ttcpbuahIejO74");
    } catch (err) {
      console.error("Couldn't authorize with or connect to Spotify", err);
    }
  }

  const handleSelected = async(name) => {
    await playEpicSong();
    props.navigation.navigate('SelectDefaultPlayList');
  };

  const renderService = () => (
    <View style={styles.services}>
      {Services.services.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.5}
          onPress={() => handleSelected(item.name)}
          style={styles.button}
        >
          <Image
            source={item.img}
            style={styles.image}
            key={i}
            width={props.theme.fonts.medium}
            height={props.theme.fonts.medium}
          />
          <Text style={styles.buttonText} key={i}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation}>
      <View style={styles.header}>
        <Text style={styles.title}>{Services.title}</Text>
        <Text style={styles.paragraph}>{Services.paragraph}</Text>
      </View>
      {renderService()}
      {/* <LinearGradientButton onPress={handleAuth}>Finish</LinearGradientButton> */}
    </BackgroundContainer>
  );
};

export default withTheme(SelectProvider);
