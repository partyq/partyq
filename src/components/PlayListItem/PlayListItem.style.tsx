import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#b2bec3',
    paddingLeft: theme.fonts.small,
    paddingBottom: theme.fonts.small,
    paddingTop: theme.fonts.small,
  },
  descriptionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'baseline',
    marginLeft: theme.fonts.medium,
  },
  image: {
    height: 50,
    width: 50,
  },
  title: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    color: theme.fonts.color,
    fontWeight: 'bold',
  },
  description: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    color: 'grey',
  },
});
