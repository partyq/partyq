import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  listContainer: {
    width: '100%',
    flex: 6,
  },
  headingText: {
    ...theme.fonts.regular,
  },
  title: {
    ...theme.fonts.medium,
  },
  numSongs: {
    ...theme.fonts.regular,
    color: 'grey',
  },
  description: {
    ...theme.fonts.thin,
    marginTop: theme.margin.regular,
    marginBottom: theme.margin.regular,
  },
  image: {
    width: 125,
    height: 125,
  },
  panel: {
    flexDirection: 'row',
    marginBottom: theme.margin.regular,
  },
  info: {
    marginLeft: theme.margin.regular,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  playListDescriptionContainer: {
    width: '100%'
  }
});