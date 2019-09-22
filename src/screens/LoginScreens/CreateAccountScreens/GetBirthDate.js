/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import CharacterInput from 'react-native-character-input';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from '../LoginScreens.style';
// import UnderlineInput from '../../../components/UnderlineInput/UnderlineInput';


const GetBirthDate = (props) => {
  const styles = jsx(props.theme);

  // state
  const [birthDate, setBirthDate] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleNavigation = () => {
    props.navigation.navigate(
      'GetGender',
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
    if (birthDate.length === 8) setDisabled(false);
    else setDisabled(true);
  }, [birthDate]);

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation} progress={0.4}>
      <View style={styles.textFieldContainer}>
        <Text style={styles.title}>{'My\nbirthday is'}</Text>
        <CharacterInput
          placeHolder={'YYYY/MM/DD'}
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
