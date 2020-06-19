import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: 350,
        borderRadius: 20
    },
    containerSelected: {
        borderColor: theme.colors.primary,
        borderWidth: 5
    },
    selectedText: {
        fontSize: 10,
        opacity: 0.5,
        fontWeight: '400'
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40
    },
    feature: {
        marginBottom: 10
    },
    grow: {
        flex: 1
    },
    price: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center'
    }
});