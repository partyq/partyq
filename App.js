import React from 'react';
import { createAppContainer } from 'react-navigation';

import { AppContextProvider } from './config/AppContextProvider';
import { Stack } from './config/AppNavigator';


const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
    render() {
        return (
            <AppContextProvider>
                <AppContainer />
            </AppContextProvider>
        );
    }
}
