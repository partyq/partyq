import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({

    // Containers
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    linearGradientContainer: {
        flex: 3,
        flexDirection: 'column'
    },
    requestedSongContainer: {
        flex: 3
    },
    partyMembersContainer: {
        flex: 1
    },
    playerContainer: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    playerHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: theme.SPACE_MEDIUM,
    },

    // Text

    playerHeading: {
        fontFamily: theme.FONT_FAMILY_BOLD,
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.COLOR_WHITE,
        letterSpacing: 1.2
    },
    playerRoomCode: {
        fontFamily: theme.FONT_FAMILY_BOLD,
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.COLOR_WHITE,
        letterSpacing: 1.50,
        fontSize: 14
    },

    // icons
    settingsIcon: {
        color: theme.COLOR_WHITE,
        height: 24,
        width: 24
    },
});