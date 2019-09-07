import { StyleSheet } from 'react-native';

export default (theme, width) => StyleSheet.create({
  container: {
    width,
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: theme.roundness,
    flexDirection: 'row',
    width,
    paddingTop: theme.fonts.regular / 2,
    paddingBottom: theme.fonts.regular / 2,
    backgroundColor: 'transparent',
  },
  unselected: {
    borderRadius: theme.roundness,
    flexDirection: 'row',
    width,
    paddingTop: theme.fonts.regular / 2,
    paddingBottom: theme.fonts.regular / 2,
    backgroundColor: theme.colors.secondaryAccent,
  },
  text: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.regular,
    color: theme.fonts.color,
    fontWeight: 'bold',
  },
  colorBegin: {
    color: theme.colors.secondaryAccent,
  },
  colorEnd: {
    color: theme.colors.primaryAccent,
  },
});