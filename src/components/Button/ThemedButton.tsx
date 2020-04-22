/* eslint-disable no-unused-vars */
import React from 'react';
import {
  withTheme,
  Button,
} from 'react-native-paper';

import jsx from './ThemedButton.style';
import { SafeAreaView } from 'react-native-safe-area-context';

export enum MODE {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

export interface iThemedButton {
  theme: any,
  width?: number,
  children?: any,
  disabled?: boolean,
  mode?: MODE | undefined,
  onPress?: () => void,
}

const ThemedButton = (props: iThemedButton) => {
  const styles = jsx(props.theme, props.width ? props.width : '100%');

  const getLabelStyle = (): any => {
    if (props.mode === MODE.CONTAINED)
      return styles.containedLabelStyle;
    else
      return styles.defaultLabelStyle;
  };

  return (
    <SafeAreaView style={{ width: props.width ? props.width : '100%' }}>
      <Button
        mode={props.mode}
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          props.mode === MODE.TEXT
            ? styles.defaultContainer
            : styles.styledContainer,
          props.disabled
            ? styles.disabledContainer
            : null,
        ]}
        labelStyle={[
          getLabelStyle(),
          props.disabled ? styles.disabledLabelStyle : null,
        ]}
      >
        {props.children}
      </Button>
    </SafeAreaView>
  );
};

export default withTheme(ThemedButton);
