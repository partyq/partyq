/* eslint-disable no-unused-vars */
import React from 'react';
import { Provider } from 'react-redux';
import {
  // @ts-ignore
  FIRESTORE_HOST,
  // @ts-ignore
  CLOUD_FUNCTIONS_HOST,
} from 'react-native-dotenv';

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

// Use a local emulator in development
// if (__DEV__ && FIRESTORE_HOST) {
//   firestore().settings({ 
//     host: FIRESTORE_HOST,
//     persistence: true,
//     cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
//     ssl: false
//   });
// }
// if (__DEV__ && CLOUD_FUNCTIONS_HOST) {
//   functions().useFunctionsEmulator(CLOUD_FUNCTIONS_HOST);
// }

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
