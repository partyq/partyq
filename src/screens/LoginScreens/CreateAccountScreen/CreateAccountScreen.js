/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import jsx from './CreateAccountScreen.style';

const CreateAccountScreen = (props) => {
  const styles = jsx(props.theme);

  const [password, setPassword] = React.useState('');
  const [passwordEncoded, setPasswordEncoded] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleCreateAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Entrance'))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  return (
    <BackgroundContainer disableBack style={styles.container}>
        <Input
          placeholder='Email'
          leftIcon={
            <Icon
              name='email'
              size={24}
              color='white'
            />
          }
          placeholderTextColor={props.theme.fonts.color}
          onChangeText={(text) => setEmail(text)}
          inputStyle={styles.inputText}
          labelStyle={styles.inputText}
          inputContainerStyle={styles.input}
        />
        <Input
          placeholder='Password'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='white'
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={props.theme.fonts.color}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.input}
        />
        <LinearGradientButton onPress={handleCreateAccount}>Create Account</LinearGradientButton>
        {/* <LinearGradientButton smallFont underline onPress={() => props.navigation.navigate('Signup')} unselected>Forgot Password?</LinearGradientButton> */}

    </BackgroundContainer>
  );
};

export default withTheme(CreateAccountScreen);
