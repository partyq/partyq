import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.fonts.large,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  services: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.medium,
    fontWeight: 'bold',
    color: theme.fonts.color,
    textAlign: 'center',
  },
  paragraph: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    color: theme.fonts.disabled,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: theme.fonts.regular,
  },
  buttonText: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.regular,
    color: theme.fonts.color,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginRight: theme.fonts.regular,
  },
});
