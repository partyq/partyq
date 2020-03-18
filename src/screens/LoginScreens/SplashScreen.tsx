/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import firebase from 'react-native-firebase';

const jsx = (theme: any) => StyleSheet.create({
  text: {
    color: theme.colors.primaryAccent,
    fontSize: 150,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundDark,
  },
  loader: {
    color: theme.fonts.color,
  },
});

export interface iSplashScreen {
  theme: any,
  navigation: any,
};

const SplashScreen = (props: iSplashScreen) => {
  const styles = jsx(props.theme);

  const handleLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate('Entrance');
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleLoggedIn();
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/PartyQ-Logo.png')}
        style={{
          height: 300,
          width: 300
        }}
      />
    </View>
  );
};

export default withTheme(SplashScreen);
