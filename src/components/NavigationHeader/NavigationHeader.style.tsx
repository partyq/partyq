import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontWeight: '700',
        fontSize: 18
    },
    hidden: {
        opacity: 0
    }
});