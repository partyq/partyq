import React from 'react';
import {
  createStackNavigator, StackNavigationProp
} from '@react-navigation/stack';

import SettingsMainScreen from './SettingsMainScreen/SettingsMainScreen';
import SettingsSelectDefaultPlaylistScreen from './SettingsSelectDefaultPlaylistScreen/SettingsSelectDefaultPlaylistScreen';
import SettingsPreviewPlaylistScreen from './SettingsPreviewPlaylistScreen/SettingsPreviewPlaylistScreen';
import { NavigationContainer } from '@react-navigation/native';
import SettingsSongRequestsScreen from './SettingsSongRequestsScreen/SettingsSongRequestsScreen';

type SettingsStackParamList = {
    Main: undefined,
    DefaultPlaylist: undefined,
    PreviewPlaylist: undefined
}

export type SettingsNavigation = StackNavigationProp<
    SettingsStackParamList
>;

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
    return (
        <NavigationContainer
            independent={true}
        >
            <SettingsStack.Navigator
                initialRouteName='Main'
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: 'white'
                    }
                }}
            >
                <SettingsStack.Screen
                    name='Main'
                    component={SettingsMainScreen}
                />
                <SettingsStack.Screen
                    name='DefaultPlaylist'
                    component={SettingsSelectDefaultPlaylistScreen}
                />
                <SettingsStack.Screen
                    name='PreviewPlayList'
                    component={SettingsPreviewPlaylistScreen}
                />
                <SettingsStack.Screen
                    name='SongRequests'
                    component={SettingsSongRequestsScreen}
                />
            </SettingsStack.Navigator>
        </NavigationContainer>
    )
}

export default SettingsNavigator