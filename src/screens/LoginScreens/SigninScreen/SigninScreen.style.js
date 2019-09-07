import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: theme.fonts.large,
    width: '80%',
    alignSelf: 'center',
  },
  inputText: {
    color: theme.fonts.color,
    fontSize: theme.fonts.regular,
    fontFamily: theme.fonts.family,
  },
});
