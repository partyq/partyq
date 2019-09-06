/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';

import styles from './WelcomeScreen.style';

class WelcomeScreen extends React.Component {
  componentDidMount = () => {
    setTimeout(this.handleChangeScreen, 1000);
  }

  handleChangeScreen = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
        <View style={styles.view}>
          <Text style={styles.text}>Q</Text>
        </View>
    );
  }
}

export default WelcomeScreen;
