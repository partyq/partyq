import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
  },
  title: {
    ...theme.fonts.regular,
    fontWeight: 'bold',
  },
  description: {
    ...theme.fonts.thin,
    color: 'grey',
    fontSize: 12,
    marginTop: 2
  },
  buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
  }
});
