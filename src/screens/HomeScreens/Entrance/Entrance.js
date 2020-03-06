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

const Entrance = (props) => {
  const styles = jsx(props.theme);

  // const handleLogout = () => {
  //   firebase.auth().signOut()
  //     .then(() => props.navigation.navigate('Signin'))
  //     .catch((error) => Alert.alert(error.message));
  // };

  const handleStartNewParty = () => props.navigation.navigate('Services');

  const handleJoinParty = () => props.navigation.navigate('Info');

  // const handleProfile = () => props.navigation.openDrawer();

  return (
    <BackgroundContainer disableBack >
      {/* <SafeAreaView style={styles.profileContainer}>
        <Icon
          name='settings'
          type='feather'
          size={24}
          color='white'
          onPress={handleLogout}
        />
      </SafeAreaView> */}
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
