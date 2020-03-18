/* eslint-disable import/prefer-default-export */
import { DefaultTheme } from 'react-native-paper';

export const Dark = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#DB486D',

    // background colors
    backgroundLight: '#263652',
    backgroundDark: '#080B10',
    background: '#FFFFFF',

    // accent
    primaryAccent: '#DB486D',
    secondaryAccent: '#633895',
  },
  fonts: {
    color: '#FFFFFF',
    dark: '#555',
    disabled: '#dfe6e9',
    small: 14,
    regular: 18,
    medium: 26,
    large: 34,
  },
  roundness: 50,
};

export const Light = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#F53F6A',

    // background colors
    backgroundLight: '#FFF',
    backgroundDark: '#FFF',
    background: '#FFFFFF',

    // accent
    primaryAccent: '#F53F6A',
    secondaryAccent: '#F53F6A',
  },
  fonts: {
    color: '#707070',
    light: '#FFF',
    dark: '#555',
    disabled: '#EDEDED',
    small: 14,
    regular: 18,
    medium: 26,
    large: 34,
  },
  roundness: 50,
};
