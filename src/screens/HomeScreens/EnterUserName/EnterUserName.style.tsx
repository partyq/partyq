import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
    // width: '100%'
  },
  text: {
    ...theme.fonts.large,
    color: theme.colors.grey600,
  },
  description: {
    ...theme.fonts.thin,
  },
  input: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.margin.large,
  },
  textInput: {
    ...theme.fonts.regular,
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: theme.roundness,
    height: 50,
    padding: theme.margin.regular
  },
});
