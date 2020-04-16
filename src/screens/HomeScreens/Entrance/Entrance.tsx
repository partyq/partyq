/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image } from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './Entrance.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { START_A_PARTY, JOIN_A_PARTY } from '../../../config/RenderableData';
import CustomButton, { MODE } from '../../../components/Button/CustomButton';

export interface iEntrance {
  theme: any,
  navigation: any,

};

const Entrance = (props: iEntrance) => {
  const styles = jsx(props.theme);
  const handleStartNewParty = () => props.navigation.navigate('Services');
  const handleJoinParty = () => props.navigation.navigate('Info');

  return (
    <BackgroundContainer disableBack>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../../assets/img/PartyQ-Logo.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleStartNewParty}
          mode={MODE.CONTAINED}
        >
          {START_A_PARTY}
        </CustomButton>
        <CustomButton
          onPress={handleJoinParty}
          mode={MODE.OUTLINED}
        >
            {JOIN_A_PARTY}
        </CustomButton>
      </View>
    </BackgroundContainer>
  );
};

export default withTheme(Entrance);
