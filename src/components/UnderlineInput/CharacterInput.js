/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';

const CharacterInput = (props) => (
  <Input
    value={props.value}
    placeholder={props.placeHolder}
    placeholderTextColor="white"
    containerStyle={{
      backgroundColor: 'transparent',
      paddingBottom: 10,
      width: 30,
      alignSelf: 'center',
    }}
    inputStyle={{
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      width: 24,
      textAlign: 'center',
      alignSelf: 'center',
    }}
    inputContainerStyle={[
      {
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        width: 24,
        alignSelf: 'center',
      },
      !props.show
        ? { borderBottomWidth: 0, paddingTop: 1, paddingBottom: 1 }
        : {},
    ]}
    onChangeText={(text) => props.onChange(props.index, text)}
    disabled={!props.show}
    disabledInputStyle={{ color: 'grey', fontWeight: 'bold' }}
    ref={(ref) => props.setRef(props.index, ref)}
    selectTextOnFocus
    maxLength={1}
    keyboardType={props.keyboardType}
    onKeyPress={({ nativeEvent }) => props.onKeyPress(props.index, nativeEvent)}
  />
);

export default CharacterInput;
