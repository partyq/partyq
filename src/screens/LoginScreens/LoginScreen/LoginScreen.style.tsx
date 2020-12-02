import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.4
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
    loginContainer: {
        width: '90%',
        marginTop: 40,
        // backgroundColor: 'red',
        flex: 0.7,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    grow: {
        flex: 1
    },
    forgotPassword: {
        fontWeight: '700',
        textAlign: 'right',
        marginBottom: 20,
        opacity: 0.8
    },
    footerText: {
        textAlign: 'center'
    },
    registerText: {
        fontWeight: '700',
        color: theme.colors.primary
    }
});
