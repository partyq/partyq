import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
  },
  services: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  },
  title: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.large,
    fontWeight: 'bold',
    color: theme.fonts.color,
  },
  paragraph: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    color: theme.fonts.color,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.fonts.regular,
    width: '100%',
    padding: 10,
    borderRadius: 10,
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
    width: theme.fonts.large,
    height: theme.fonts.large,
  },
});
