import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(AppNavigator);

const AppNavigator = createStackNavigator({
    Home: HomeScreen
});