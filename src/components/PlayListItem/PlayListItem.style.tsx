import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  container: {
    height: 75,
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
  },
});
