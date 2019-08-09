import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    text: {
        fontFamily: theme.FONT_FAMILY_MEDIUM,
        textAlign: 'center',
        letterSpacing: theme.LETTER_SPACING
    },
    textInput: {
        backgroundColor: theme.COLOR_WHITE,
        width: "80%",
        paddingTop: theme.SPACE_SMALL,
        paddingBottom: theme.SPACE_SMALL,
        paddingLeft: theme.SPACE_MEDIUM,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: theme.BORDER_ROUND,
        letterSpacing: theme.LETTER_SPACING,
        fontFamily: theme.FONT_FAMILY_MEDIUM
    },
    title: {
        fontSize: theme.FONT_SIZE_SMALL,
        color: theme.COLOR_WHITE
    },
    buttonText: {
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.PRIMARY_COLOR
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
    wrappingContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxHeight: '40%',
    },
    button: {
        backgroundColor: theme.COLOR_WHITE,
        borderRadius: theme.BORDER_ROUND,
        width: '90%',
        paddingTop: theme.SPACE_SMALL,
        paddingBottom: theme.SPACE_SMALL,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cellStyleFocused: {
        borderColor: theme.PRIMARY_COLOR,
        borderWidth: 2,
        borderRadius: 10
    },
    cellStyle : {
        borderColor: theme.COLOR_WHITE,
        borderWidth: 2,
        borderRadius: 10    
    },
    textStyle: {
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.COLOR_WHITE
    },
    textStyleFocused: {
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        color: theme.PRIMARY_COLOR
    }
});