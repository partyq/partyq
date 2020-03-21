/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// StackNavigation Screens
import SplashScreen from '../screens/LoginScreens/SplashScreen';
import Entrance from '../screens/HomeScreens/Entrance/Entrance';
import SelectProvider from '../screens/HomeScreens/SelectProvider/SelectProvider';
import EnterPartyCode from '../screens/HomeScreens/EnterPartyInfo/EnterPartyInfo';
import SelectDefaultPlaylistScreen from '../screens/HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import PartyMainScreen from '../screens/PartyScreens/Main/PartyMainScreen';
import PreviewPlayListScreen from '../screens/HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';

export const Stack = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Entrance: { screen: Entrance },
    Services: { screen: SelectProvider },
    SelectDefaultPlayList: { screen: SelectDefaultPlaylistScreen },
    PreviewPlayList: { screen: PreviewPlayListScreen },
    Info: { screen: EnterPartyCode },
    PartyMain: { screen: PartyMainScreen }
  },
  {
    initialRouteKey: 'Splash',
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
