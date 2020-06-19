import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    topPadding: {
        flex: 0.5
    },
    headerContainer: {
        marginBottom: 50
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 15
    },
    description: {
        textAlign: 'center'
    }
});