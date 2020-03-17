/* eslint-disable no-unused-vars */
import React from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { withTheme } from 'react-native-paper';
import firebase from 'react-native-firebase';

import jsx from './Entrance.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { START_A_PARTY, JOIN_A_PARTY } from '../../../config/RenderableData';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';

export interface iEntrance {
  theme: any,
  navigation: any,

};

const Entrance = (props: iEntrance) => {
  const styles = jsx(props.theme);
  const handleStartNewParty = () => props.navigation.navigate('Services');
  const handleJoinParty = () => props.navigation.navigate('Info');

  return (
    <BackgroundContainer disableBack >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PartyQ</Text>
      </View>

      <View style={styles.buttonContainer}>
        <LinearGradientButton onPress={handleStartNewParty} >{START_A_PARTY}</LinearGradientButton>
        <LinearGradientButton onPress={handleJoinParty} >{JOIN_A_PARTY}</LinearGradientButton>
      </View>
    </BackgroundContainer>
  );
};

export default withTheme(Entrance);
