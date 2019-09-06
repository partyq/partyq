/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { Text } from 'react-native';

import jsx from './SettingScreen.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';


const SettingScreen = (props) => {
  const styles = jsx(props.theme);

  return (
        <BackgroundContainer disableBack>
            <Text>Setting</Text>
        </BackgroundContainer>
  );
};

export default withTheme(SettingScreen);
