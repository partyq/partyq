import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0,
    width: '100%',
    marginBottom: 15,
  },
  searchBarContainer: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchBarInputContainer: {
    width: '100%',
    borderRadius: theme.roundness,
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
  inputText: {
    ...theme.fonts.thin,
    textAlignVertical: 'center',
  },
});
