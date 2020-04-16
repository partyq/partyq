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
    borderColor: theme.colors.disabled,
  },
  containedLabelStyle: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.regular,
    fontWeight: 'bold',
  },
  defaultLabelStyle: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.regular,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  disabledLabelStyle: {
    color: theme.colors.disabled,
  },
});
