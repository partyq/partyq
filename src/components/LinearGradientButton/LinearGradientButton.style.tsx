import { StyleSheet } from 'react-native';

export default (theme: any, width: number | string) => StyleSheet.create({
  container: {
    width,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button: {
    borderRadius: theme.roundness,
    flexDirection: 'row',
    width,
    paddingTop: theme.fonts.small / 2,
    paddingBottom: theme.fonts.small / 2,
    backgroundColor: 'transparent',
    borderWidth: 0,
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
    color: theme.fonts.light,
    fontWeight: 'bold',
  },
  colorBegin: {
    color: theme.colors.secondaryAccent,
  },
  colorEnd: {
    color: theme.colors.primaryAccent,
  },
});
