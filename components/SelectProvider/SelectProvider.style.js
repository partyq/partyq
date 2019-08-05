import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    text: {
        fontFamily: theme.FONT_FAMILY,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: theme.FONT_WEIGHT_BOLD,
        color: theme.COLOR_WHITE,
        textAlign: 'center',
        letterSpacing: theme.LETTER_SPACING
    },
    container: {
        flex: 1,
        padding: theme.CONTAINER_PADDING,
        flexDirection: 'column'
    },
    backContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    paragraphContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15%'
    },
    servicesContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    serviceButton: {
        borderRadius: theme.BORDER_ROUND,
        width: '90%',
        paddingTop: theme.SPACE_SMALL,
        paddingBottom: theme.SPACE_SMALL,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.SPACE_LARGE
    },
    spotifyButton: {
        backgroundColor: '#1ed760',
    },
    image: {
        width: 35,
        height: 35
    },
    appleMusicButton: {
        backgroundColor: theme.COLOR_WHITE,
    }
});