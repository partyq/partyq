import { StyleSheet, Dimensions } from 'react-native';

export default (theme) => StyleSheet.create({
  text: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.medium,
    color: theme.fonts.color,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: theme.colors.background,
    width: Dimensions.get('window').width * 0.8,
    paddingTop: theme.fonts.small,
    paddingBottom: theme.fonts.small,
    paddingLeft: theme.fonts.small,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: theme.roundness,
    fontFamily: theme.fonts.family,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  wrappingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxHeight: '50%',
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
