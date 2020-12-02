/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';

import jsx from './EnterPartyCode.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { getPartyById } from '../../../utility/backend';
import { setPartyId } from '../../../actions/partyActions';

export interface iEnterPartyCode {
  theme: any,
  navigation: any,
  setPartyId: (partyId: string) => void
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

  const handleNavigation = () => {
    getPartyById(code)
      .then(
        (partyId: string | null) => {
          if (partyId === null) {
            Alert.alert(
              'Could not find party.',
              'There is no party with the ID that you specified.'
            )
            return;
          }
          props.setPartyId(code);
          props.navigation.navigate('EnterUserName');
        }
      )
  }

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

const mapDispatchToProps = (dispatch: Function) => ({
  setPartyId: (partyId: string) => dispatch(setPartyId(partyId))
});

export default connect(
  null,
  mapDispatchToProps
)(
  withTheme(EnterPartyCode)
);
