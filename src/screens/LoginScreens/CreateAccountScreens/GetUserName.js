/* eslint-disable no-unused-vars */
import React, { useState, createRef } from 'react';
import { Input } from 'react-native-elements';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from '../LoginScreens.style';
import { USER_NAME_IS_EMPTY, USER_NAME_CRITERIA, USER_NAME_IS_TAKEN } from '../../../utility/Constants';


const GetUserName = (props) => {
  const styles = jsx(props.theme);

  // ref
  const userRef = createRef();

  // state
  const [_userName, setUserName] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const handleCheck = () => {
    const re = /^\w+$/;
    setUserErrorMessage('');

    if (_userName.trim().length <= 0) {
      userRef.current.shake();
      setUserErrorMessage(USER_NAME_IS_EMPTY);
      return false;
    }

    if (!re.test(_userName) || _userName.trim().length >= 25) {
      userRef.current.shake();
      setUserErrorMessage(USER_NAME_CRITERIA);
      return false;
    }

    return true;
  };

  const handleNavigation = () => {
    if (handleCheck()) {
      props.navigation.navigate(
        'GetBirthDate',
        {
          userName: _userName.trim(),
        },
      );
    }
  };

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation} progress={0.2}>
      <View style={styles.textFieldContainer}>
        <Text style={styles.title}>{'My user\nname is'}</Text>
        <Input
          placeholder='User Name'
          errorMessage={userErrorMessage}
          placeholderTextColor={props.theme.fonts.color}
          onChangeText={(text) => setUserName(text)}
          inputStyle={styles.inputText}
          ref={userRef}
        />
      </View>
      <LinearGradientButton onPress={handleNavigation}>Next</LinearGradientButton>
    </BackgroundContainer>
  );
};

export default withTheme(GetUserName);
