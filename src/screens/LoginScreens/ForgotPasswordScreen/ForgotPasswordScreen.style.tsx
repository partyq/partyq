import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.35
    },
    headerContainer: {
        width: '90%'
    },
    title: {
        fontWeight: '800',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 25
    },
    description: {
        textAlign: 'center'
    },
    grow: {
        flex: 1
    },
    sendLinkContainer: {
        marginTop: 35,
        width: '90%'
    }
});