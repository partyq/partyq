/* eslint-disable import/prefer-default-export */
import { DefaultTheme, Colors } from 'react-native-paper';

const defaultFontConfig = (defaultColor: string) => {
  const fontConfig = {
    large: {
      fontFamily: 'System',
      fontWeight: '800',
      fontSize: 36,
      color: defaultColor,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '600',
      fontSize: 24,
      color: defaultColor,
    },
    regular: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 16,
      color: defaultColor,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 16,
      color: defaultColor,
    }
  }

  return fontConfig;
};

export const Light = {
  ...DefaultTheme,
  roundness: 50,
  dark: false,
  colors: {
    ...Colors,
    text: Colors.black,
    primary: '#F53F6A',
    background: Colors.white,
    surface: Colors.white,
    accent: '#F53F6A',
    error: Colors.red100,
    onSurface: Colors.white,
    disabled: Colors.grey600,
    placeHolder: Colors.grey500,
    backdrop: Colors.white,
  },
  fonts: defaultFontConfig(Colors.black),
  divider: {
    marginTop: 10,
    marginBottom: 10,
  }
};


export const Dark = {
  ...DefaultTheme,
  roundness: 50,
  dark: false,
  colors: {
    ...Colors,
    primary: '#F53F6A',
    background: Colors.white,
    surface: Colors.white,
    accent: '#F53F6A',
    text: Colors.white,
    onSurface: Colors.white,
    disabled: Colors.grey600,
    placeHolder: Colors.grey500,
    backdrop: Colors.white,
  },
  fonts: defaultFontConfig(Colors.white),
  divider: {
    marginTop: 10,
    marginBottom: 10,
  }
};
