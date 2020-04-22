import { StyleSheet, Dimensions } from 'react-native';

export default (theme: any) => StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
    // width: '100%'
  },
  code: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.margin.large,
  },
  text: {
    ...theme.fonts.large,
    color: theme.colors.grey600,
  },
  description: {
    ...theme.fonts.thin,
  },
  cellStyleFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 15,
  },
  cellStyle: {
    borderColor: theme.fonts.text,
    borderWidth: 2,
    borderRadius: 15,
  },
  textStyle: {
    ...theme.fonts.medium,
    color: theme.fonts.text,
  },
  textStyleFocused: {
    ...theme.fonts.medium,
    color: theme.fonts.text,
  },
});
