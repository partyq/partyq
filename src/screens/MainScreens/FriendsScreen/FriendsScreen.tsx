import React, { useEffect, useState } from 'react';
import { withTheme } from 'react-native-paper';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import SearchView from '../../../components/SearchView/SearchView';
import jsx from './FriendsScreen.style';
import { FlatList } from 'react-native-gesture-handler';
import { iUser, iFriend } from 'src/utility/types';
import { connect } from 'react-redux';

interface iFriendItemProps {
    name: string,
    styles?: {
        root?: any,
        title?: any
    }
}

const FriendItem = (props: iFriendItemProps) => {
    const {
        name,
        styles
    } = props;

    return (
        <View style={styles?.root}>
            <Text style={styles?.title}>
                {name}
            </Text>
        </View>
    )
}

interface iFriendsScreenProps {
    theme: any,
    navigation: any,
    friends: iFriend[]
}

const FriendsScreen = (props: iFriendsScreenProps) => {
    const {
        theme,
        navigation,
        friends
    } = props;

    const styles = jsx(theme);

    const onAddFriendPressed = () => {
        navigation.navigate('AddFriend');
    }

    return (
        <SafeAreaView>
            <HeaderBar
                title='Friends List'
                right={
                    <ThemedButton
                        mode={MODE.CONTAINED}
                        size='xs'
                        width={80}
                        onPress={onAddFriendPressed}
                    >
                        + Add
                    </ThemedButton>
                }
            />
            <View style={styles.contentContainer}>
                <SearchView

                />
                {/* <Text
                    style={styles.requestsText}
                    onPress={() => null}
                >
                    View 3 friend requests
                </Text> */}
                <View
                    style={styles.listView}
                >
                    {friends.length > 0
                        ? (
                            <FlatList
                                data={friends}
                                renderItem={({item, index}) => (
                                    <FriendItem
                                        key={index}
                                        name='Test'
                                        styles={{
                                            root: [
                                                styles.friendItem,
                                                index === friends.length - 1 ? styles.lastItem : null 
                                            ],
                                            title: styles.friendTitle
                                        }}
                                    />
                                )}
                            />
                        )
                        : (
                            <View style={styles.noFriendsContainer}> 
                                <Text style={styles.noFriendsText}>
                                    You haven't added any friends yet.
                                </Text>
                                <ThemedButton
                                    mode={MODE.CONTAINED}
                                    size='sm'
                                    width='80%'
                                    onPress={onAddFriendPressed}
                                >
                                    Add your first friend
                                </ThemedButton>
                                <View
                                    style={styles.noFriendsPadding}
                                />
                            </View>
                        )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => ({
    friends: state.userReducer.friends
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(FriendsScreen)
);