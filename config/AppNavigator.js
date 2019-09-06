/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// StackNavigation Screens
import Entrance from '../src/screens/Entrance/Entrance';
import SelectProvider from '../src/components/SelectProvider/SelectProvider';
import EnterPartyCode from '../src/screens/EnterPartyInfo/EnterPartyInfo';
import PartyScreen from '../src/screens/PartyScreen/PartyScreen';
import SettingScreen from '../src/screens/SettingScreen/SettingScreen';
import SelectDefaultPlaylistScreen from '../src/screens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
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
    Entrance: { screen: Entrance },
    Services: { screen: SelectProvider },
    SelectDefaultPlayList: { screen: SelectDefaultPlaylistScreen },
    Info: { screen: EnterPartyCode },
    Party: { screen: Tabs },
  },
  {
    initialRouteKey: 'Entrance',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    },
  },
);
