/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import firebase from 'react-native-firebase';

const jsx = (theme) => StyleSheet.create({
  text: {
    color: theme.colors.primaryAccent,
    fontSize: 150,
    fontFamily: 'Comfortaa-Bold',
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

const SplashScreen = (props) => {
  const styles = jsx(props.theme);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'Entrance' : 'Entrance');
    });
  });

  return (
    <View disableBack style={styles.container}>
      <Text style={styles.text}>Q</Text>
    </View>
  );
};

export default withTheme(SplashScreen);
