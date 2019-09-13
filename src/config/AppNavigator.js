/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// StackNavigation Screens
import SplashScreen from '../screens/LoginScreens/SplashScreen';
import SigninScreen from '../screens/LoginScreens/SigninScreen';
import GetUserName from '../screens/LoginScreens/CreateAccountScreens/GetUserName';
import GetBirthDate from '../screens/LoginScreens/CreateAccountScreens/GetBirthDate';
import CreateAccountScreen from '../screens/LoginScreens/CreateAccountScreens/CreateAccountScreen';
import Entrance from '../screens/HomeScreens/Entrance/Entrance';
import SelectProvider from '../screens/HomeScreens/SelectProvider/SelectProvider';
import EnterPartyCode from '../screens/HomeScreens/EnterPartyInfo/EnterPartyInfo';
import PartyScreen from '../screens/PartyRoomScreens/PartyScreen/PartyScreen';
import SettingScreen from '../screens/PartyRoomScreens/SettingScreen/SettingScreen';
import SelectDefaultPlaylistScreen from '../screens/HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import { Dark } from '../assets/style/theme';


export const Tabs = createMaterialTopTabNavigator(
  {
    Party: {
      screen: PartyScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="music-note" type="fontisto" color={tintColor} />,
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="settings" type="feather" color={tintColor} />,
      },
    },
  },
  {
    order: ['Settings', 'Party'],
    initialRouteName: 'Party',
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Dark.colors.color,
      inactiveTintColor: Dark.fonts.disabled,
      style: {
        backgroundColor: Dark.colors.backgroundLight,
        borderTopColor: Dark.colors.backgroundDark,
      },
      indicatorStyle: {
        height: 0,
      },
      tabStyle: {
        height: 50,
      },
      iconStyle: {
        height: 10,
        width: 10,
      },
      labelStyle: {
        fontSize: 12,
      },
    },
  },
);

export const Stack = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Signin: { screen: SigninScreen },
    GetUserName: { screen: GetUserName },
    GetBirthDate: { screen: GetBirthDate },
    CreateAccount: { screen: CreateAccountScreen },
    Entrance: { screen: Entrance },
    Services: { screen: SelectProvider },
    SelectDefaultPlayList: { screen: SelectDefaultPlaylistScreen },
    Info: { screen: EnterPartyCode },
    Party: { screen: Tabs },
  },
  {
    initialRouteKey: 'Splash',
    initialRouteName: 'Splash',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    },
  },
);
