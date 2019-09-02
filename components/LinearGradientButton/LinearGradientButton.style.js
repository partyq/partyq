import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default jsx = (theme) =>  StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.75
    },
    button: {
        borderRadius: theme.roundness,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: theme.fonts.regular/2,
        paddingBottom: theme.fonts.regular/2
    },
    text: {
        fontFamily: theme.fonts.family,
        fontSize: theme.fonts.regular,
        color: theme.fonts.color,
        fontWeight: 'bold'
    },
    colorBegin: {
        color: theme.colors.secondaryAccent,
    },
    colorEnd: {
        color: theme.colors.primaryAccent
    }
});
