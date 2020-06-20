/* eslint-disable no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// StackNavigation Screens
import SplashScreen from '../screens/SplashScreen';
import EntranceScreen from '../screens/LoginScreens/EntranceScreen/EntranceScreen';
import LoginScreen from '../screens/LoginScreens/LoginScreen/LoginScreen';
import SelectProvider from '../screens/HomeScreens/SelectProvider/SelectProvider';
import EnterPartyCode from '../screens/HomeScreens/EnterPartyCode/EnterPartyCode';
import EnterUserName from '../screens/HomeScreens/EnterUserName/EnterUserName';
import SelectDefaultPlaylistScreen from '../screens/HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import PartyMainScreen from '../screens/PartyScreens/Main/PartyMainScreen';
import PreviewPlayListScreen from '../screens/HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';
import RegisterScreen from '../screens/LoginScreens/RegisterScreen/RegisterScreen';
import VerifyEmailScreen from '../screens/LoginScreens/VerifyEmailScreen/VerifyEmailScreen';
import ChoosePlanScreen from '../screens/LoginScreens/ChoosePlanScreen/ChoosePlanScreen';
import ForgotPasswordScreen from '../screens/LoginScreens/ForgotPasswordScreen/ForgotPasswordScreen';
import ForgotPasswordEmailSentScreen from '../screens/LoginScreens/ForgotPasswordEmailSentScreen/ForgotPasswordEmailSentScreen';
import MainScreenWrapper from '../screens/MainScreens/MainScreenWrapper';

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
                    component={EntranceScreen} 
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                />
                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name='VerifyEmail'
                    component={VerifyEmailScreen}
                />
                <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name='ForgotPasswordEmailSent'
                    component={ForgotPasswordEmailSentScreen}
                />
                <Stack.Screen
                    name='ChoosePlan'
                    component={ChoosePlanScreen}
                />
                <Stack.Screen
                    name='Main'
                    component={MainScreenWrapper}
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
