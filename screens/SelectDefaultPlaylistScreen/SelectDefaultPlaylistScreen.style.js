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
        backgroundColor: theme.PRIMARY_COLOR
    },
    searchBar: {
        width: '90%',
        backgroundColor: 'transparent'
    },
    listContainer: {
        flex: 6
    },
    placeHolderTextColor: {
        color: '#b2bec3'
    },
    text: {
        color: theme.COLOR_WHITE,
        fontSize: 150,
        fontFamily: theme.FONT_FAMILY_BOLD
    }
});