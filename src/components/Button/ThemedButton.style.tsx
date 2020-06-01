import { StyleSheet } from 'react-native';

export default (theme: any, width: string | number) => StyleSheet.create({
  defaultContainer: {
    width,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  styledContainer: {
    width,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  disabledContainer: {
    borderColor: theme.colors.grey300,
    backgroundColor: theme.colors.grey300,
  },
  containedLabelStyle: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
  defaultLabelStyle: {
    ...theme.fonts.regular,
    color: theme.colors.primary,
  },
  disabledLabelStyle: {
    color: theme.colors.disabled,
  },
  small: {
    fontSize: 14
  }
});