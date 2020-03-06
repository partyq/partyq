/* eslint-disable newline-per-chained-call */
/* eslint-disable no-unused-vars */
import React, { useState, createRef } from 'react';
import { withTheme } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { Text, View, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import PasswordValidator from 'password-validator';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from '../LoginScreens.style';

const schema = new PasswordValidator();

schema
  .is().min(8)
  .is().max(20)
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

const CreateAccountScreen = (props) => {
  const styles = jsx(props.theme, 30);

  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  // refs
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleNavigation = () => this.props.navigation.navigate('Entrance');

  const handleCreateAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => firebase.firestore().collection('users').doc(cred.user.uid).set({
        birthDate: props.navigation.getParam('birthDate'),
        gender: props.navigation.getParam('gender'),
        displayName: props.navigation.getParam('userName'),
      }))
      .then(handleNavigation)
      .catch((error) => console.log(error));
  };

  const onEndEditing = () => {
    if (schema.validate(password)) {
      setDisabled(false);
    } else {
      passwordRef.current.shake();
      setDisabled(true);
    }
  };

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation} progress={0.8}>
      <View style={styles.textFieldContainer}>
        <Text style={styles.title}>Almost there!</Text>
        <Input
          value={email}
          placeholder='Email'
          placeholderTextColor={props.theme.fonts.color}
          onChangeText={(text) => setEmail(text)}
          inputStyle={styles.inputText}
          labelStyle={styles.inputText}
          inputContainerStyle={{ marginBottom: 25 }}
          ref={emailRef}
        />
        <Input
          value={password}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={props.theme.fonts.color}
          inputStyle={styles.inputText}
          labelStyle={styles.inputText}
          inputContainerStyle={{ marginBottom: 25 }}
          ref={passwordRef}
          secureTextEntry
          onEndEditing={onEndEditing}
        />
      </View>
      <LinearGradientButton disabled={disabled} onPress={handleCreateAccount}>
        Create Account
      </LinearGradientButton>
    </BackgroundContainer>
  );
};

export default withTheme(CreateAccountScreen);
