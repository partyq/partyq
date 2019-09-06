/* eslint-disable no-unused-vars */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import jsx from './PartyScreen.style';
import PlayerView from '../../../components/PlayerView/PlayerView';

const PartyScreen = (props) => {
  const styles = jsx(props.theme);

  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[props.theme.colors.secondaryAccent, '#DC5681']} style={styles.linearGradientContainer}>
        <View style={styles.playerHeader}>
          <Text style={[styles.baseText, styles.playerRoomCode]}>12345</Text>
          <Text style={[styles.baseText, styles.playerHeading]}>Currently Playing</Text>
          <Icon name='settings' type='material' iconStyle={styles.settingsIcon} />
        </View>
        <View style={styles.playerContainer}>
          <PlayerView />
        </View>
      </LinearGradient>

      <View style={styles.requestedSongContainer}>
        <Text>Hello request</Text>
      </View>

      <View styles={styles.partyMembersContainer}>
        <Text>Hello members</Text>
      </View>
    </View >
  );
};

export default withTheme(PartyScreen);
