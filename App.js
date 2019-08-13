import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen'
import SelectDefaultPlaylistScreen from './screens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen'
import PartyScreen from './screens/PartyScreen/PartyScreen'

const RootStack = createStackNavigator(
    {
        Welcome: { screen: WelcomeScreen },
        Home: { screen: HomeScreen },
        SelectDefaultPlaylist: { screen: SelectDefaultPlaylistScreen },
        Party: { screen: PartyScreen }
    },
    {
        initialRouteKey: 'Welcome',
        headerMode: 'none',
        defaultNavigationOptions: {
            headerVisible: false,
        }
    }
)

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
