/* eslint-disable no-unused-vars */
import React from 'react';
import { View } from 'react-native';

import CharacterInput from './CharacterInput';

const UnderlineInput = (props) => {
  const placeHolderCharsArray = props.placeHolderChar.split('');
  const [string, setString] = React.useState([...placeHolderCharsArray]);
  const binary = `${props.binary}`.split('');
  const refs = [];

  React.useEffect(() => {
    props.handleChange(string.join(''));
  }, [string]);

  const setChar = (i, c) => {
    const temp = [...string];
    temp[i] = c;
    setString(temp);
  };

  const goBack = (i) => {
    if (i === 0) {
      refs[i].shake();
    } else if (i > 0 && i <= props.length - 1 && binary[i - 1] === '1') {
      refs[i - 1].focus();
    } else if (i - 1 > 0 && binary[i - 2] === '1') {
      goBack(i - 1);
    }
  };

  const goForward = (i) => {
    if (i === props.length - 1) {
      refs[i].shake();
    } else if (i >= 0 && i < props.length - 1 && binary[i + 1] === '1') {
      refs[i + 1].focus();
    } else if (i + 1 < props.length - 1 && binary[i + 2] === '1') {
      goForward(i + 1);
    }
  };

  const onChange = (i, c) => {
    if (c.length === 1) {
      goForward(i);
      setChar(i, c);
    } else if (c.length === 0) {
      goBack(i);
      setChar(i, c);
    } else if (c.length > 1) {
      refs[i].shake();
    }
  };

  const setRef = (i, ref) => {
    refs[i] = ref;
  };

  const onKeyPress = (i, e) => {
    if (i === 0 && e.key === 'Backspace') {
      refs[i].shake();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {string.map((c, i) => (
        <CharacterInput
          placeHolder={placeHolderCharsArray[i]}
          onChange={onChange}
          index={i}
          show={binary[i] === '1'}
          setRef={setRef}
          keyboardType={props.keyboardType}
          value={c}
          onKeyPress={onKeyPress}
        />
      ))}
    </View>
  );
};

export default UnderlineInput;
