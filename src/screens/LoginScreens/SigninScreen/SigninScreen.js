/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withTheme } from 'react-native-paper';
import { TextInput } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from './SigninScreen.style';
import { EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from '../../../utility/Constants';


const SigninScreen = (props) => {
  const styles = jsx(props.theme);
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate('Entrance'))
      .catch((error) => {
        emailRef.current.shake();
        emailRef.current.clear();
        setEmailError(EMAIL_ERROR_MESSAGE);
        passwordRef.current.shake();
        passwordRef.current.clear();
        setPasswordError(PASSWORD_ERROR_MESSAGE);
      });
  };

  const handleCheckSignin = () => {
    let emailValide = true;
    let passwordValide = true;

    if (email.length <= 0) {
      emailValide = false;
      emailRef.current.shake();
      setEmailError(EMAIL_ERROR_MESSAGE);
    }

    if (password.length <= 0) {
      passwordValide = false;
      passwordRef.current.shake();
      setPasswordError(PASSWORD_ERROR_MESSAGE);
    }
    if (emailValide && passwordValide) handleLogin();
  };

  return (
    <BackgroundContainer disableBack style={styles.container} navigation={props.navigation}>
        <Input
          placeholder='Email'
          errorMessage={emailError}
          placeholderTextColor={props.theme.fonts.color}
          onChangeText={(text) => setEmail(text)}
          inputStyle={styles.inputText}
          containerStyle={styles.inputComponentContainer}
          keyboardType='email-address'
          ref={emailRef}
        />
        <Input
          placeholder='Password'
          errorMessage={passwordError}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={props.theme.fonts.color}
          inputStyle={styles.inputText}
          containerStyle={styles.inputComponentContainer}
          secureTextEntry
          ref={passwordRef}
        />
        <LinearGradientButton onPress={handleCheckSignin}>Sign in</LinearGradientButton>
        <LinearGradientButton smallFont underline onPress={() => props.navigation.navigate('CreateAccount')} unselected>Create Account</LinearGradientButton>
        <LinearGradientButton smallFont underline onPress={() => props.navigation.navigate('Signup')} unselected>Forgot Password?</LinearGradientButton>

    </BackgroundContainer>
  );
};

export default withTheme(SigninScreen);
