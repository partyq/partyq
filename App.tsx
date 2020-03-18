/* eslint-disable no-unused-vars */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';


// eslint-disable-next-line no-unused-vars
import { AppContextProvider } from './src/config/AppContextProvider';
import { Stack } from './src/config/AppNavigator';
import store from './src/store/store';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

// eslint-disable-next-line no-unused-vars
const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this

  render() {
    return (
      <Provider store={store}>
        <AppContextProvider>
          <AppContainer />
        </AppContextProvider>
      </Provider>
    );
  }
}
