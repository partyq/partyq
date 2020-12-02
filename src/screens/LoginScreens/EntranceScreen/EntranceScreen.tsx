/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './EntranceScreen.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
// import { START_A_PARTY, JOIN_A_PARTY } from '../../../config/RenderableData';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';

export interface iEntranceScreenProps {
  theme: any,
  navigation: any,
};

const EntranceScreen = (props: iEntranceScreenProps) => {
  const styles = jsx(props.theme);

  const handleLogin = () => props.navigation.navigate('Login');
  const handleRegister = () => props.navigation.navigate('Register');

  return (
    <ImageBackground
      source={require('../../../assets/img/Entrance_Background.png')}
      style={{
        flex: 1
      }}
    >
      <BackgroundContainer 
        style={{
          backgroundColor: 'transparent'
        }}
        disableBack
        statusBarStyle='light-content'
      >
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../assets/img/PartyQ_Light.png')}
            style={{
              height: 150,
              width: 150,
              resizeMode: 'contain'
            }}
          />
        </View>
        <View
          style={styles.padding}
        />
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed ut lorem aliquet.
        </Text>
        <View style={styles.buttonContainer}>
          <ThemedButton
            color='white'
            onPress={handleLogin}
            mode={MODE.OUTLINED}
            width='48%'
          >
            Login
          </ThemedButton>
          <ThemedButton
            color='white'
            onPress={handleRegister}
            mode={MODE.CONTAINED}
            width='48%'
          >
            Register
          </ThemedButton>
        </View>
      </BackgroundContainer>
    </ImageBackground>
  );
};

export default withTheme(EntranceScreen);
