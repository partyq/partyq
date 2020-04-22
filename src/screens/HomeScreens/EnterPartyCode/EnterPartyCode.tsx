/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import jsx from './EnterPartyCode.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';

export interface iEnterPartyCode {
  theme: any,
  navigation: any
};

const EnterPartyCode = (props: iEnterPartyCode) => {
  const styles = jsx(props.theme);
  const [code, setCode] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const pinInput: any = React.createRef();

  const checkCode = () => {
    if (code !== '12345' && code.length === 5) {
      pinInput.current.shake().then(() => setCode(''));
    } else {
      setDisableButton(false);
      pinInput.current.blur();
    }
  };

  const handleNavigation = () => props.navigation.navigate('EnterUserName');

  return (
    <BackgroundContainer navigation={props.navigation} >
      <View style={styles.header}>
        <Text style={styles.text}>Enter Party Code</Text>
        <Text style={styles.description}>
          Enter the 5 digit code for the party you want to join
        </Text>
      </View>
      <View style={styles.code}>
        <SmoothPinCodeInput
          ref={pinInput}
          value={code}
          onTextChange={(_code: string) => setCode(_code)}
          onFulfill={checkCode}
          codeLength={5}
          cellSpacing={15}
          cellSize={45}
          cellStyleFocused={styles.cellStyleFocused}
          cellStyle={styles.cellStyle}
          textStyle={styles.textStyle}
          textStyleFocused={styles.textStyleFocused}
        />
      </View>
      <ThemedButton
        disabled={disableButton}
        mode={MODE.CONTAINED}
        onPress={handleNavigation}
      >
        Next
      </ThemedButton>
    </BackgroundContainer>
  );
};

export default withTheme(EnterPartyCode);
