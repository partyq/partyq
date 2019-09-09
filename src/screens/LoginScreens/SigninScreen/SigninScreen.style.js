import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputComponentContainer: {
    marginBottom: theme.fonts.regular,
  },
  inputText: {
    color: theme.fonts.color,
    fontSize: theme.fonts.regular,
    fontFamily: theme.fonts.family,
  },
});
