import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { withTheme, ActivityIndicator, Colors } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import jsx from './AddFriendScreen.style';
import NavigationHeader from '../../../components/NavigationHeader/NavigationHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchView from '../../../components/SearchView/SearchView';
import { iUser, iFriend } from '../../../utility/types';
import { connect } from 'react-redux';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { FlatList } from 'react-native-gesture-handler';

interface iUserItemProps {
    data: iUser,
    user: iUser,
    isFriend: boolean,
    setFriend: () => void,
    styles?: {
        root?: any,
        title?: any
    }
}

const UserItem = (props: iUserItemProps) => {
    const {
        data,
        user,
        isFriend,
        setFriend,
        styles
    } = props;

    const [loading, setLoading] = useState(false);

    const onAddFriendPressed = async () => {
        setLoading(true);
        try {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    friends: firestore.FieldValue.arrayUnion({
                        username: data.username
                    })
                });
        } catch (err) {
            // TODO: Handle errors
            console.log(err);
            setLoading(false);
            return;
        }
        setLoading(false);
        setFriend();
    }

    return (
        <View style={styles?.root}>
            <Text style={styles?.title}>
                {data.username}
            </Text>
            <ThemedButton
                mode={MODE.CONTAINED}
                disabled={isFriend || loading}
                onPress={onAddFriendPressed}
                size='xs'
                width={isFriend ? 170 : 150}
            >
                {isFriend
                    ? 'Already a Friend'
                    : loading
                    ? (
                        <ActivityIndicator
                            animating={true}
                            color={Colors.grey500}
                        />
                    )
                    : 'Add Friend'}
            </ThemedButton>
        </View>
    )
}

interface iAddFriendScreenProps {
    navigation: any,
    theme: any,
    user: iUser
}

const AddFriendScreen = (props: iAddFriendScreenProps) => {
    const {
        theme,
        navigation,
        user
    } = props;

    const [query, setQuery] = useState('');
    const [activeSearch, setActiveSearch] = useState('');
    const [results, setResults] = useState<iUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');

    const styles = jsx(theme);

    const onSearch = async () => {
        setLoading(true);
        let searchResults: iUser[] = [];
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('username', '>=', query)
                .where('username', '<=', query + '\uf8ff')
                .get();
            querySnapshot.docs.forEach(docSnapshot => {
                const searchUser = docSnapshot.data() as iUser;
                if (user.username !== searchUser.username) {
                    searchResults.push({
                        ...searchUser,
                        uid: docSnapshot.id
                    });
                }
            });
        } catch (err) {
            setLoadError('Could not load users.');
        }
        setResults(searchResults);
        setLoading(false);
        setActiveSearch(query);
    }

    return (
        <SafeAreaView>
            <NavigationHeader
                navigation={navigation}
                title='Add a Friend'
            />
            <View style={styles.contentContainer}>
                <SearchView
                    onChangeText={(text: string) => setQuery(text.toLowerCase())}
                    onEndEditing={onSearch}
                    value={query}
                />
                {activeSearch
                    ? (
                        results.length === 0 || loadError
                            ? (
                                <View style={styles.noResultsContainer}>
                                    <View
                                        style={styles.noResultsPad}
                                    />
                                    <Text style={styles.noResultsText}>
                                        {loadError
                                            ? loadError
                                            : 'No users found matching that username.'}
                                    </Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    style={styles.userList}
                                    data={results}
                                    renderItem={({item, index}) => (
                                        <UserItem
                                            key={index}
                                            data={item}
                                            user={user}
                                            isFriend={user.friends.find(f => f.username === item.username) !== undefined}
                                            setFriend={() => null}
                                            styles={{
                                                root: [
                                                    styles.userItem,
                                                    index === results.length - 1
                                                        ? styles.lastUserItem
                                                        : null
                                                ],
                                                title: styles.userItemTitle
                                            }}
                                        />
                                    )}
                                />
                            )
                    )
                    : (
                        <View style={styles.noResultsContainer}>
                            <View
                                style={styles.noResultsPad}
                            />
                            {loading
                                ? (
                                    <ActivityIndicator
                                        animating={true}
                                        color={Colors.grey400}
                                        size='large'
                                    />
                                )
                                : (
                                    <Text style={styles.noResultsText}>
                                        Use the search bar to search for a friend.
                                    </Text>
                                )}
                            
                        </View>
                    )}
            </View>
            
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(AddFriendScreen)
);