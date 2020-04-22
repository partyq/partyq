/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import jsx from './EnterPartyInfo.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';

export interface iEnterPartyCode {
  theme: any,
  navigation: any
};

const EnterPartyCode = (props: iEnterPartyCode) => {
  const styles = jsx(props.theme);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [isCodeValide, setIsCodeValide] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const pinInput: any = React.createRef();

  const checkCode = () => {
    if (code !== '12345' && code.length === 5) {
      pinInput.current.shake().then(() => setCode(''));
    } else {
      setDisableButton(false);
      setIsCodeValide(true);
    }
  };

  const handleNavigation = () => props.navigation.navigate('Party');

  return (
    <BackgroundContainer navigation={props.navigation} >
      <View style={styles.header}>
        <Text style={styles.text}>Enter Party Code</Text>
      </View>
      <View style={styles.code}>
        {isCodeValide
          ? <TextInput
            style={styles.textInput}
            placeholder="Type a funny name :)"
            onChangeText={(_name) => setName(_name)}
            value={name}
          />
          : <SmoothPinCodeInput
            ref={pinInput}
            value={code}
            onTextChange={(_code: string) => setCode(_code)}
            onFulfill={checkCode}
            codeLength={5}
            cellSpacing={6}
            cellSize={40}
            cellStyleFocused={styles.cellStyleFocused}
            cellStyle={styles.cellStyle}
            textStyle={styles.textStyle}
            textStyleFocused={styles.textStyleFocused}
          />
        }
      </View>
      <ThemedButton
        disabled={disableButton}
        mode={MODE.CONTAINED}
        onPress={handleNavigation}
      >
        Join the Party!
      </ThemedButton>
    </BackgroundContainer>
  );
};

export default withTheme(EnterPartyCode);
