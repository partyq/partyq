/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';


import { NO_INTERNET_CONNECTION } from '../../utility/Constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'red',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
  },
  offlineText: {
    color: '#fff',
    fontSize: 12,
  },
});

const StatusBar = (props) => (
  <SafeAreaView style={styles.offlineContainer}>
    <Text style={styles.offlineText}>{NO_INTERNET_CONNECTION}</Text>
  </SafeAreaView>
);

const InternetStatus = (props) => {
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectivityChange = (state) => {
    setIsConnected(state);
  };

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      handleConnectivityChange(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isConnected
        ? null
        : StatusBar()
      }
    </>
  );
};

export default InternetStatus;
