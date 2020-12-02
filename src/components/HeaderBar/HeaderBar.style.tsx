import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    item: {
        width: 100
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    title: {
        fontWeight: '700',
        fontSize: 18
    },
    alignRight: {
        alignItems: 'flex-end'
    }
})