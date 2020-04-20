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
    width: '100%'
  },
  title: {
    ...theme.fonts.large,
    color: theme.colors.grey600,
  },
  moreComing: {
    ...theme.fonts.thin,
    color: theme.colors.placeHolder,
    textAlign: 'center',
  },
  paragraph: {
    ...theme.fonts.thin,
    color: theme.fonts.color,
  },
  button: {
    width: '100%',
    borderRadius: 10,
  },
  buttonText: {
    ...theme.fonts.regular,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  divider: theme.divider,
});
