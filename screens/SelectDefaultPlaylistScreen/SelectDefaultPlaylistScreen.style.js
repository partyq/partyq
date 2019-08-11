import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.PRIMARY_COLOR,
        borderWidth: 0
    },
    searchBarContainer: {
        width: '95%',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: theme.SPACE_SMALL,
        marginBottom: theme.SPACE_SMALL
    },
    searchBarInputContainer: {
        borderRadius: theme.BORDER_ROUND,
    },
    listContainer: {
        flex: 6
    },
    placeHolderTextColor: {
        color: '#b2bec3'
    },
    headingText: {
        color: theme.COLOR_WHITE,
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        fontFamily: theme.FONT_FAMILY_BOLD,
        marginTop: theme.SPACE_SMALL,
        marginBottom: theme.SPACE_SMALL
    },
    item: {
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: '#b2bec3',
        marginLeft: theme.SPACE_EXTRA_SMALL,
        marginRight: theme.SPACE_EXTRA_SMALL,
        paddingLeft: theme.SPACE_EXTRA_SMALL,
        paddingBottom: theme.SPACE_EXTRA_SMALL,
        paddingTop: theme.SPACE_EXTRA_SMALL,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});