/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './Entrance.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { START_A_PARTY, JOIN_A_PARTY } from '../../../config/RenderableData';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';

export interface iEntrance {
  theme: any,
  navigation: any,
};

const Entrance = (props: iEntrance) => {
  const styles = jsx(props.theme);
  const handleStartNewParty = () => props.navigation.navigate('Services');
  const handleJoinParty = () => props.navigation.navigate('EnterPartyCode');

  return (
    <ImageBackground
      source={require('../../../assets/img/Intro_Background.png')}
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

        <View style={styles.buttonContainer}>
          <ThemedButton
            onPress={handleStartNewParty}
            mode={MODE.CONTAINED}
          >
            {START_A_PARTY}
          </ThemedButton>
          <ThemedButton
            onPress={handleJoinParty}
            mode={MODE.OUTLINED}
          >
              {JOIN_A_PARTY}
          </ThemedButton>
        </View>
      </BackgroundContainer>
    </ImageBackground>
  );
};

export default withTheme(Entrance);
