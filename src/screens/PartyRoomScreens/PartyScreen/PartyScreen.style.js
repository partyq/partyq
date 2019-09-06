import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  linearGradientContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  requestedSongContainer: {
    flex: 3,
  },
  partyMembersContainer: {
    flex: 1,
  },
  playerContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  playerHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: theme.fonts.medium,
  },
  playerHeading: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    fontWeight: 'bold',
    color: theme.fonts.color,
    letterSpacing: 1.2,
  },
  playerRoomCode: {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.small,
    fontWeight: 'bold',
    color: theme.fonts.color,
    letterSpacing: 1.50,
  },
  settingsIcon: {
    color: theme.fonts.color,
    height: 24,
    width: 24,
  },
});
