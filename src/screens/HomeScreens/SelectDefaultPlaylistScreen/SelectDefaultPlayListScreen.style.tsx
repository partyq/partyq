import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0,
    flex: 1,
    width: '100%',
  },
  searchBarContainer: {
    width: '100%',
    height: theme.fonts.large,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainer: {
    width: '100%',
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.backgroundDark,
    borderColor: theme.colors.dark,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  listContainer: {
    width: '100%',
    flex: 6,
  },
  headingText: {
    color: theme.fonts.color,
    fontSize: theme.fonts.regular,
    fontFamily: theme.fonts.family,
    textAlignVertical: 'center',
  },
  inputText: {
    fontSize: theme.fonts.small,
    fontFamily: theme.fonts.family,
    textAlignVertical: 'center',
  },
  item: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#b2bec3',
    paddingBottom: theme.fonts.small,
    paddingTop: theme.fonts.small,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});