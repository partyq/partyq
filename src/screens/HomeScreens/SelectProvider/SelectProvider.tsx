/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { AppInstalledChecker } from 'react-native-check-app-install';
import Spinner from 'react-native-loading-spinner-overlay';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { Provider, iProvider } from '../../../config/RenderableData';
import { setToken } from '../../../actions';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';

export interface iSelectProvider {
  theme: any,
  setToken: (token: string) => void,
  navigation: any,
};

const SelectProvider = (props: iSelectProvider) => {
  const styles = jsx(props.theme);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [providerId, setProviderId] = useState<string>('');
  const [providers, updateProviders] = useState<iProvider[]>([]);

  useEffect(() => {
    Provider.providers.forEach((item) => item.selected = false);
    updateProviders([...Provider.providers]);
    return () => {
      updateProviders([]);
      console.log(providers)
    }
  }, []);

  const initService = async () => {
    try {
      AppInstalledChecker
        .isAppInstalled('spotify')
        .then(async (isInstalled: boolean) => {
          if (isInstalled === true) {
            // await props.MusicService.authorize();
            props.navigation.navigate('SelectDefaultPlayList');
          }
          else {
            Alert.alert('Spotify App must be installed to use their services.');
          }
        });
    } catch (err) {
      console.debug("Couldn't authorize with or connect to Spotify", err);
    }
    setSpinner(false);
  }

  const handleAuth = async (providerId: string) => {
    try {
      setSpinner(true);
      initService();
    } catch (err) {
      console.debug(err);
      setSpinner(false);
    }
  };

  const handleSelect = (newProviderId: string) => {
    if (!newProviderId || newProviderId === providerId) return;

    const temp = [...providers];
    temp.forEach((provider, i) => {
      if (provider.name === newProviderId) {
        provider.selected = true;
      }
      else {
        provider.selected = false;
      }
    });

    updateProviders(temp);
    setProviderId(newProviderId);
  };

  return (
    <BackgroundContainer navigation={props.navigation}>
      <Spinner visible={spinner} />
      <View style={styles.header}>
        <Text style={styles.title}>{Provider.title}</Text>
        <Text style={styles.paragraph}>{Provider.paragraph}</Text>
      </View>
      <View style={styles.services}>
        {providers.map(({ name, img, selected }: iProvider, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.5}
            onPress={() => handleSelect(name)}
            style={[
              styles.button,
              selected ? {backgroundColor: '#EDEDED'} : null
            ]}
          >
            <Image
              source={img}
              style={styles.image}
              key={i}
            />
            <Text style={styles.buttonText} key={i}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LinearGradientButton
        onPress={() => handleAuth(providerId)}
        disabled={providerId === '' ? true : false}
      >
        Next
      </LinearGradientButton>
    </BackgroundContainer>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setToken: (token: string) => dispatch(setToken(token)),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(SelectProvider));
