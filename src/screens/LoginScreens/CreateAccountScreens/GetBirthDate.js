/* eslint-disable no-unused-vars */
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { withTheme } from 'react-native-paper';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from '../LoginScreens.style';
import UnderlineInput from '../../../components/UnderlineInput/UnderlineInput';

const GetBirthDate = (props) => {
  const styles = jsx(props.theme);

  // state
  const [birthDate, setBirthDate] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleNavigation = () => {
    props.navigation.navigate(
      'CreateAccount',
      {
        userName: props.navigation.getParam('userName'),
        birthDate,
      },
    );
  };

  const handleChange = (date) => {
    setBirthDate(date.replace('/', ''));
  };

  React.useEffect(() => {
    if (birthDate.length === 8) setDisabled(true);
    else setDisabled(false);
  }, [birthDate]);

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation}>
      <View style={styles.textFieldContainer}>
        <Text style={styles.title}>My Birthday Is</Text>
        <UnderlineInput
          placeHolderChar={'YYYY/MM/DD'}
          binary={'1111011011'}
          length={10}
          handleChange={handleChange}
        />
      </View>
      <LinearGradientButton disabled={disabled} onPress={handleNavigation}>
        Next
      </LinearGradientButton>
    </BackgroundContainer>
  );
};

export default withTheme(GetBirthDate);