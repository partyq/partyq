import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.5
    },
    headerContainer: {
        width: '90%'
    },
    title: {
        fontWeight: '900',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 25
    },
    description: {
        textAlign: 'center'
    },
    grow: {
        flex: 1
    },
    email: {
        fontWeight: '600'
    },
    resendContainer: {
        marginTop: 35,
        width: '90%'
    },
    smallText: {
        fontSize: 11,
        opacity: 0.7,
        textAlign: 'center',
        marginVertical: 15
    },
    verifiedText: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.colors.primary
    }
});