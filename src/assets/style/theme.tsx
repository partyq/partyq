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

const margin = {
  large: 36,
  medium: 24,
  regular: 16,
  small: 8,
}

const defaultThemeConfig = {
  ...DefaultTheme,
  margin: margin,
  roundness: 50,
};

export const Light = {
  ...defaultThemeConfig,
  dark: false,
  colors: {
    ...Colors,
    text: Colors.black,
    primary: '#F53F6A',
    background: Colors.white,
    accent: '#F53F6A',
    disabled: Colors.grey400,
    placeHolder: Colors.grey500,
  },
  fonts: defaultFontConfig(Colors.black),
};


export const Dark = {
  ...defaultThemeConfig,
  dark: true,
  colors: {
    ...Colors,
    text: Colors.white,
    primary: '#F53F6A',
    background: Colors.black,
    accent: '#F53F6A',
    disabled: Colors.grey600,
    placeHolder: Colors.grey500,
  },
  fonts: defaultFontConfig(Colors.white),
};
