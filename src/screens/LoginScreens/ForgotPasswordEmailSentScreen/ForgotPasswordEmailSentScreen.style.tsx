import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.45
    },
    headerContainer: {
        width: '90%',
        marginBottom: 50
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
    email: {
        fontWeight: '600'
    },
});