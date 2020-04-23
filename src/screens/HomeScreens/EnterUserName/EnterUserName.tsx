/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './EnterUserName.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import { joinParty } from '../../../actions/partyActions';
import { setUserName } from '../../../actions/userActions';

export interface iEnterUserName {
  theme: any,
  navigation: any,
  username: string,
  joinParty: (callback: ((error: string | null) => void) | undefined) => void,
  setUsername: (username: string) => void
};

const EnterUserName = (props: iEnterUserName) => {
  const styles = jsx(props.theme);
  const [disableButton, setDisableButton] = useState(true);

  const handleNavigation = () => {
    props.joinParty((error: string | null) => {
      if (error !== null) {
        Alert.alert(
          'Could not join party.',
          error
        );
        return;
      }
      props.navigation.navigate('PartyMain');
    })
    
  }

  return (
    <BackgroundContainer navigation={props.navigation}>
      <View style={styles.header}>
        <Text style={styles.text}>Enter User Name</Text>
        <Text style={styles.description}>
          This will be your display name in the party
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Display Name"
          onChangeText={(_name) => props.setUsername(_name)}
          value={props.username}
          onEndEditing={() => setDisableButton(false)}
        />
      </View>
      <ThemedButton
        disabled={disableButton}
        mode={MODE.CONTAINED}
        onPress={handleNavigation}
      >
        JOIN PARTY
      </ThemedButton>
    </BackgroundContainer>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  joinParty: (callback: ((error: string | null) => void) | undefined) => dispatch(joinParty(callback)),
  setUsername: (username: string) => dispatch(setUserName(username))
});

export default connect(
  null,
  mapDispatchToProps
)(
  withTheme(EnterUserName)
);
