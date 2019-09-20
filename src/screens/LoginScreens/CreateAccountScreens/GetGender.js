/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from '../LoginScreens.style';
import { GENDER_IDENTITIES } from '../../../utility/Constants';

const GetGender = (props) => {
  const styles = jsx(props.theme);

  // state
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(Array(3).fill(false));
  const [gender, setGender] = useState('');

  const handleNavigation = () => {
    props.navigation.navigate(
      'CreateAccount',
      {
        userName: props.navigation.getParam('userName'),
        birthDate: props.navigation.getParam('birthDate'),
        gender,
      },
    );
  };

  const handleCheck = (i, _gender) => {
    const temp = Array(3).fill(false);
    temp[i] = true;
    setChecked(temp);
    setGender(_gender);
  };

  useEffect(() => {
    if (gender !== '') setDisabled(false);
    else setDisabled(true);
  }, [gender]);

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation} progress={0.6}>
      <View style={styles.textFieldContainer}>
        <Text style={styles.title}>{'I identify as'}</Text>
        {
          GENDER_IDENTITIES.map((_gender, i) => (
            <CheckBox
              title={_gender}
              checked={checked[i]}
              onPress={() => handleCheck(i, _gender)}
              iconType={'AntDesign'}
              checkedIcon={'check'}
              uncheckedIcon={''}
              key={i}
            />
          ))
        }
      </View>
      <LinearGradientButton disabled={disabled} onPress={handleNavigation}>
        Next
      </LinearGradientButton>
    </BackgroundContainer>
  );
};

export default withTheme(GetGender);
