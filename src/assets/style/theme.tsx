/* eslint-disable import/prefer-default-export */
import { DefaultTheme, Colors, configureFonts } from 'react-native-paper';

const defaultFontConfig = {
  large: {
    fontFamily: 'System',
    fontWeight: '800',
    fontSize: 36,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 24
  },
  regular: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
  },
  thin: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 16,
  },
}

export const Light = {
  ...DefaultTheme,
  roundness: 50,
  dark: false,
  colors: {
    ...Colors,
    primary: '#F53F6A',
    background: Colors.white,
    surface: Colors.white,
    accent: '#F53F6A',
    error: Colors.red100,
    text: Colors.white,
    onSurface: Colors.white,
    disabled: Colors.grey600,
    placeHolder: Colors.grey500,
    backdrop: Colors.white,
    onWhite: Colors.black,
    onDark: Colors.white,
  },
  fonts: defaultFontConfig,
  divider: {
    marginTop: 10,
    marginBottom: 10,
  }
};


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
