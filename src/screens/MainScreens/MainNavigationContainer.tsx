import React from 'react';
import {
  createStackNavigator
} from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';
import FriendsScreen from './FriendsScreen/FriendsScreen';
import AddFriendScreen from './AddFriendScreen/AddFriendScreen';

const MainStack = createStackNavigator();

const MainNavigationContainer = () => {
    return (
        <NavigationContainer
            independent={true}
        >
            <MainStack.Navigator
                initialRouteName='Home'
                headerMode='none'
            >
                <MainStack.Screen
                    name='Home'
                    component={HomeScreen}
                />
                <MainStack.Screen
                    name='Friends'
                    component={FriendsScreen}
                />
                <MainStack.Screen
                    name='AddFriend'
                    component={AddFriendScreen}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigationContainer;