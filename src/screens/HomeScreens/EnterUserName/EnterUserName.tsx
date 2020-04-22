/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './EnterUserName.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import CustomButton, { MODE } from '../../../components/Button/CustomButton';

export interface iEnterUserName {
  theme: any,
  navigation: any
};

const EnterUserName = (props: iEnterUserName) => {
  const styles = jsx(props.theme);
  const [name, setName] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleNavigation = () => props.navigation.navigate('PartyMain');

  return (
    <BackgroundContainer navigation={props.navigation} >
      <View style={styles.header}>
        <Text style={styles.text}>Enter Party Code</Text>
        <Text style={styles.description}>
          This will be your display name in the party
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Display Name"
          onChangeText={(_name) => setName(_name)}
          value={name}
          onEndEditing={() => setDisableButton(false)}
        />
      </View>
      <CustomButton
        disabled={disableButton}
        mode={MODE.CONTAINED}
        onPress={handleNavigation}
      >
        JOIN PARTY
      </CustomButton>
    </BackgroundContainer>
  );
};

export default withTheme(EnterUserName);
