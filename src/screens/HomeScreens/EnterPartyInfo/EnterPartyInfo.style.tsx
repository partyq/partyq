import { StyleSheet, Dimensions } from 'react-native';

export default (theme: any) => StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
  },
  code: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.large,
    fontWeight: 'bold',
    color: theme.fonts.color,
  },
  textInput: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.color,
    borderWidth: 2,
    width: '100%',
    paddingTop: theme.fonts.small,
    paddingBottom: theme.fonts.small,
    paddingLeft: theme.fonts.small,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: theme.roundness,
    fontFamily: theme.fonts.family,
  },
  cellStyleFocused: {
    borderColor: theme.colors.primaryAccent,
    borderWidth: 2,
    borderRadius: 10,
  },
  cellStyle: {
    borderColor: theme.fonts.color,
    borderWidth: 2,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: theme.fonts.small,
    color: theme.fonts.color,
  },
  textStyleFocused: {
    fontSize: theme.fonts.small,
    color: theme.colors.primaryAccent,
  },
});
