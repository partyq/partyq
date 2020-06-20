import React from 'react';
import {
  createStackNavigator
} from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';

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
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigationContainer;