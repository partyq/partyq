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
  width?: number | string,
  children?: any,
  disabled?: boolean,
  mode?: MODE | undefined,
  size?: 'sm' | 'xs',
  color?: string,
  textColor?: string,
  onPress?: () => void,
}

const ThemedButton = (props: iThemedButton) => {
  const styles = jsx(
    props.theme, 
    props.width ? props.width : '100%',
    props.color ? props.color : props.theme.colors.primary
  );

  const getLabelStyle = (): any => {
    if (props.mode === MODE.CONTAINED)
      return styles.containedLabelStyle;
    else
      return styles.defaultLabelStyle;
  };

  const getButtonStyle = (): any => {
    if (props.mode === MODE.TEXT) {
      return styles.defaultContainer;
    } else if (props.mode === MODE.CONTAINED) {
      return styles.containedContainer;
    } else if (props.mode === MODE.OUTLINED) {
      return styles.outlinedContainer;
    }
  }

  return (
    <Button
      mode={props.mode}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        getButtonStyle(),
        props.disabled
          ? styles.disabledContainer
          : null,
      ]}
      labelStyle={[
        getLabelStyle(),
        props.disabled 
          ? styles.disabledLabelStyle 
          : null,
        props.size === 'sm'
          ? styles.small :
        props.size === 'xs'
          ? styles.extraSmall
          : null
      ]}
    >
      {props.children}
    </Button>
  );
};

export default withTheme(ThemedButton);
