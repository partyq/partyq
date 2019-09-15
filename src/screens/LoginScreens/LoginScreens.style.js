import { StyleSheet } from 'react-native';

export default (theme, titleMargin = 30) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 70,
    paddingTop: 20,
  },
  textFieldContainer: {
    marginBottom: theme.fonts.large,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inputComponentContainer: {
    marginBottom: theme.fonts.small,
  },
  inputText: {
    color: theme.fonts.color,
    fontSize: theme.fonts.regular,
    fontFamily: theme.fonts.family,
    paddingBottom: 0,
    marginBottom: 0,
  },
  title: {
    color: theme.fonts.color,
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
    marginBottom: titleMargin,
  },
});
