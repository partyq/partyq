import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

// StackNavigation Screens
import Entrance from '../components/Entrance/Entrance';
import SelectProvider from '../components/SelectProvider/SelectProvider';
import SelectDefaultPlaylistScreen from '../screens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import EnterPartyCode from '../components/EnterPartyInfo/EnterPartyInfo';
import PartyScreen from '../screens/PartyScreen/PartyScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';



export const Tabs = createMaterialTopTabNavigator(
    {
        Party: { screen: PartyScreen },
        Settings: { screen: SettingScreen }
    },
    {
        order: ['Settings', 'Party'],
        initialRouteName: 'Party',
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            style: {
                backgroundColor: 'white'
            },
            indicatorStyle: {
                height: 0
            }
        }
    }
);



export const Stack = createStackNavigator(
    {
        Entrance: { screen: Entrance },
        Services: { screen: SelectProvider },
        // DefaultPlayList: { screens: SelectDefaultPlaylistScreen },
        // Info: { screens: EnterPartyCode },
        // Party: { screen: Tabs }
    },
    {
        initialRouteKey: 'Entrance',
        // headerMode: 'none',
        // defaultNavigationOptions: {
        //     headerVisible: false,
        // }
    }
);




