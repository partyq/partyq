import { StyleSheet } from 'react-native'
import theme from '../../assets/style/theme.style';

export default StyleSheet.create({
    container: {
        height: 100,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#b2bec3',
        paddingLeft: theme.SPACE_SMALL,
        paddingBottom: theme.SPACE_SMALL,
        paddingTop: theme.SPACE_SMALL
    },
    descriptionContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignSelf: 'baseline',
        marginLeft: theme.SPACE_MEDIUM
    },
    image: {
        height: 75,
        width: 75
    },
    title: {
        fontFamily: theme.FONT_FAMILY_MEDIUM,
        fontSize: 14,
        color: 'black'
    },
    description: {
        fontFamily: theme.FONT_FAMILY_MEDIUM,
        fontSize: 14,
        color: 'grey'
    }
});