import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20
    },
    noResultsContainer: {
        height: '100%',
        // backgroundColor: 'red'
    },
    noResultsPad: {
        flex: 0.32
    },
    noResultsText: {
        textAlign: 'center',
        // fontWeight: '600'
    },
    userList: {
        marginTop: 15
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 17,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderTopWidth: 1,
        alignItems: 'center'
    },
    lastUserItem: {
        borderBottomWidth: 1
    },
    userItemTitle: {
        fontWeight: '600'
    }
});