import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.family,
    fontWeight: 'bold',
    fontSize: theme.fonts.large,
    color: theme.fonts.color,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '20%',
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: theme.fonts.medium,
    paddingTop: theme.fonts.regular,
  },
});
