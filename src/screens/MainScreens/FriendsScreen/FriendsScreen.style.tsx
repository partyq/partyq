import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        // paddingVertical: 10
    },
    requestsText: {
        fontWeight: '600'
    },
    listView: {
        // backgroundColor: 'red',
        // flexGrow: 1,
        width: '100%',
        height: '100%',
        // marginTop: 20,
        marginTop: 5,
        paddingTop: 10
    },
    friendItem: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },
    lastItem: {
        borderBottomWidth: 1
    },
    friendTitle: {
        fontWeight: '600'
    },
    noFriendsContainer: {
        // backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noFriendsPadding: {
        flex: 0.5
    },
    noFriendsText: {
        textAlign: 'center',
        marginBottom: 15
    }
})