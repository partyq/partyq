import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.3
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 15
    },
    description: {
        textAlign: 'center'
    },
    registerContainer: {
        width: '90%',
        marginTop: 40,
        // backgroundColor: 'red',
        flex: 2.5,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    grow: {
        flex: 1
    },
    footerText: {
        textAlign: 'center'
    },
    loginText: {
        fontWeight: '700',
        color: theme.colors.primary
    }
});