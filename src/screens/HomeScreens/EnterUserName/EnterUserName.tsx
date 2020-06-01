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
  joinParty: () => Promise<any>,
  setUsername: (username: string) => void
};

const EnterUserName = (props: iEnterUserName) => {
  const styles = jsx(props.theme);
  const [disableButton, setDisableButton] = useState(true);

  const handleNavigation = async() => {
    try {
      await props.joinParty();
      props.navigation.navigate('PartyMain');
    }
    catch (error) {
      Alert.alert('Could not join party.', error);
    } 
  };

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
          onChangeText={(_name) => {
            props.setUsername(_name);
            if (_name.length > 0) {
              setDisableButton(false);
            } else {
              setDisableButton(true);
            }
          }}
          value={props.username}
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
  joinParty: () => dispatch(joinParty()),
  setUsername: (username: string) => dispatch(setUserName(username))
});

export default connect(null,mapDispatchToProps)(withTheme(EnterUserName));
