/* eslint-disable no-unused-vars */
import React from 'react';
import { createAppContainer } from 'react-navigation';

// eslint-disable-next-line no-unused-vars
import { AppContextProvider } from './src/config/AppContextProvider';
import { Stack } from './src/config/AppNavigator';
import InternetStatus from './src/components/InternetStatus/InternetStatus';

// eslint-disable-next-line no-console
// console.disableYellowBox = true;

// eslint-disable-next-line no-unused-vars
const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <AppContextProvider>
        <AppContainer />
      </AppContextProvider>
    );
  }
}
