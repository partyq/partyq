import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    textField: {
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
        borderRadius: 10
    },
    subheader: {
        opacity: 0.5,
        fontSize: 16
    },
    listItem: {
        padding: 0
    },
    digitTextField: {
        width: 40,
        textAlign: 'right'
    },
    disabled: {
        opacity: 0.5
    }
});