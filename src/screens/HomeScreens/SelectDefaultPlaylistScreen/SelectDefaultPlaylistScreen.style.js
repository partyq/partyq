import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0,
  },
  searchBarContainer: {
    width: '95%',
    height: theme.fonts.large,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: theme.fonts.medium,
  },
  searchBarInputContainer: {
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.backgroundDark,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: theme.fonts.small,
  },
  listContainer: {
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
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#b2bec3',
    marginLeft: theme.fonts.small,
    marginRight: theme.fonts.small,
    paddingLeft: theme.fonts.small,
    paddingBottom: theme.fonts.small,
    paddingTop: theme.fonts.small,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
