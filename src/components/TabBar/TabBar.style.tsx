import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    tabList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15
    },
    tabItemTitle: {
        textAlign: 'center'
    },
    tabItemIcon: {
        height: 25,
        marginBottom: 5
    },
    active: {
        color: theme.colors.primary,
        textAlign: 'center',
        fontWeight: '700'
    }
})