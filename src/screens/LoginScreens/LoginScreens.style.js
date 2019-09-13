import { StyleSheet } from 'react-native';

export default (theme, titleMargin = 75) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
  },
  textFieldContainer: {
    marginBottom: theme.fonts.medium,
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  },
  inputComponentContainer: {
    marginBottom: theme.fonts.small,
  },
  inputText: {
    color: theme.fonts.color,
    fontSize: theme.fonts.regular,
    fontFamily: theme.fonts.family,
  },
  title: {
    color: theme.fonts.color,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
    marginBottom: titleMargin,
  },
});
