/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

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

  React.useEffect(() => {
    // auth().signInAnonymously()
    //   .then(
    //     () => {
    //       props.navigation.navigate('Entrance');
    //     }
    //   );
    props.navigation.navigate('Entrance');
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/PartyQ_Dark.png')}
        style={{
          height: 150,
          width: 150,
          resizeMode: 'contain'
        }}
      />
    </View>
  );
};

export default withTheme(SplashScreen);
