import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    grow: {
        flex: 1
    },
    topBar: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flex: 0.25,
    },
    topBarWrapper: {
        padding: 30,
        height: '100%'
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 10
    }
});