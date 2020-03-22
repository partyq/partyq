/* eslint-disable no-unused-vars */
import React from 'react';
import { Provider } from 'react-redux';


// eslint-disable-next-line no-unused-vars
import { AppContextProvider } from './src/config/AppContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/config/AppNavigator';
import store from './src/store/store';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

export default class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this

  render() {
    return (
      <Provider store={store}>
        <AppContextProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </AppContextProvider>
      </Provider>
    );
  }
}
