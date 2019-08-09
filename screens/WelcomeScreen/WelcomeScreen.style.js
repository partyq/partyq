import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    view: {
        backgroundColor: theme.PRIMARY_COLOR,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: theme.COLOR_WHITE,
        fontSize: 150,
        fontFamily: theme.FONT_FAMILY_BOLD
    }
});