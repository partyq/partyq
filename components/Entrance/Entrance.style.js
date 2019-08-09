import {StyleSheet} from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: theme.FONT_FAMILY_BOLD,
        fontSize: 60,
        color: theme.COLOR_WHITE
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '20%'
    },
    button: {
        backgroundColor: theme.COLOR_WHITE,
        borderRadius: theme.BORDER_ROUND,
        width: '90%',
        paddingTop: theme.SPACE_SMALL,
        paddingBottom: theme.SPACE_SMALL
    },
    buttonText: {
        fontFamily: theme.FONT_FAMILY_BOLD,
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.PRIMARY_COLOR,
        textAlign: 'center'
    }
});