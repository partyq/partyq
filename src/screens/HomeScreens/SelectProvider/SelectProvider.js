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
  ApiScope,
} from 'react-native-spotify-remote';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { Services } from '../../../config/RenderableData';
import { setToken } from '../../../actions';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  IP,
  PORT
} from 'react-native-dotenv'


// Api Config object, replace with your own applications client id and urls
const spotifyConfig = {
  clientID: SPOTIFY_CLIENT_ID,
  redirectURL: SPOTIFY_REDIRECT_URL,
	tokenRefreshURL: `http://${IP}:${PORT}/refresh`,
	tokenSwapURL: `http://${IP}:${PORT}/swap`,
  scope: ApiScope.AppRemoteControlScope | ApiScope.PlaylistReadPrivateScope
};

const SelectProvider = (props) => {
  const styles = jsx(props.theme);

  // Initialize the library and connect the Remote
  // then play an epic song
  const playEpicSong = async() => {
    try {
      const token = await SpotifyAuth.initialize(spotifyConfig);
      props.setToken(token);
    } catch (err) {
      console.debug("Couldn't authorize with or connect to Spotify", err);
    }
  }

  const handleSelected = async(name) => {
    try{
      await playEpicSong();
      props.navigation.navigate('SelectDefaultPlayList');
    } catch (err) {
      console.debug(err)
    }
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

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token)),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(SelectProvider));
