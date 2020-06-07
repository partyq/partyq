import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    textField: {
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
        borderRadius: 10,
        width: 50
    },
    subheader: {
        opacity: 0.5,
        fontSize: 16
    },
    listItem: {
        padding: 0
    },
    footer: {
        textAlign: 'center',
        opacity: 0.3,
        fontSize: 14,
        fontWeight: '400'
    },
    playlistImage: {
        height: 100,
        width: 100
    }
});
