/* eslint-disable no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// StackNavigation Screens
import SplashScreen from '../screens/LoginScreens/SplashScreen';
import Entrance from '../screens/HomeScreens/Entrance/Entrance';
import SelectProvider from '../screens/HomeScreens/SelectProvider/SelectProvider';
import EnterPartyCode from '../screens/HomeScreens/EnterPartyCode/EnterPartyCode';
import EnterUserName from '../screens/HomeScreens/EnterUserName/EnterUserName';
import SelectDefaultPlaylistScreen from '../screens/HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import PartyMainScreen from '../screens/PartyScreens/Main/PartyMainScreen';
import PreviewPlayListScreen from '../screens/HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode='none'
                initialRouteName='Splash'
            >
                <Stack.Screen 
                    name='Splash' 
                    component={SplashScreen} 
                />
                <Stack.Screen 
                    name='Entrance' 
                    component={Entrance} 
                />
                <Stack.Screen 
                    name='Services' 
                    component={SelectProvider} 
                />
                <Stack.Screen 
                    name='SelectDefaultPlayList' 
                    component={SelectDefaultPlaylistScreen} 
                />
                <Stack.Screen 
                    name='PreviewPlayList' 
                    component={PreviewPlayListScreen} 
                />
                <Stack.Screen 
                    name='EnterPartyCode' 
                    component={EnterPartyCode} 
                />
                <Stack.Screen 
                    name='EnterUserName' 
                    component={EnterUserName} 
                />
                <Stack.Screen 
                    name='PartyMain' 
                    component={PartyMainScreen} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
