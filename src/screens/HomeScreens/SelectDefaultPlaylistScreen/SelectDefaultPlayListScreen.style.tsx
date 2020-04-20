import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  searchContainer: {
    height: 60,
    borderWidth: 0,
    width: '100%',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listContainer: {
    width: '100%',
    flex: 6,
  },
  headingText: {
    ...theme.fonts.regular,
    textAlignVertical: 'center',
  },
  inputText: {
    ...theme.fonts.thin,
    textAlignVertical: 'center',
  },
});