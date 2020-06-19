import { StyleSheet } from 'react-native';

export default (theme: any, width: string | number, color: any) => StyleSheet.create({
  defaultContainer: {
    width,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  outlinedContainer: {
    width,
    borderWidth: 2,
    borderColor: color,
  },
  containedContainer: {
    width,
    borderWidth: 2,
    borderColor: color,
    backgroundColor: color
  },
  disabledContainer: {
    borderColor: theme.colors.grey300,
    backgroundColor: theme.colors.grey300,
  },
  containedLabelStyle: {
    ...theme.fonts.regular,
    color: color === 'white' ? 'black' : theme.colors.white,
  },
  defaultLabelStyle: {
    ...theme.fonts.regular,
    color: color,
  },
  disabledLabelStyle: {
    color: theme.colors.disabled,
  },
  small: {
    fontSize: 14
  },
  extraSmall: {
    fontSize: 12
  }
});
