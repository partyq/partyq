/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  withTheme,
  Text,
  List
} from 'react-native-paper';
import { connect } from 'react-redux';
import { AppInstalledChecker } from 'react-native-check-app-install';
import Spinner from 'react-native-loading-spinner-overlay';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { Provider, iProvider } from '../../../config/RenderableData';
import { setProviderId, getProviderInstance } from '../../../actions';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';

export interface iSelectProvider {
  theme: any,
  setProviderId: (providerId: string) => void,
  getProviderInstance: () => any,
  providerId: string,
  navigation: any,
};

export interface iProviders {
  styles: any,
  providers: iProvider[],
  handleSelect: (newProviderId: string) => void,
};

const SelectProvider = (props: iSelectProvider) => {
  const styles = jsx(props.theme);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [providers, updateProviders] = useState<iProvider[]>([]);

  const reset = () => {
    Provider.providers.forEach((item) => item.selected = false);
    updateProviders([...Provider.providers]);
  };

  useEffect(() => {
    reset();
    return () => {
      reset();
    }
  }, []);

  const initService = async () => {
    try {
      AppInstalledChecker
        .isAppInstalled('spotify')
        .then(async (isInstalled: boolean) => {
          if (isInstalled === true) {
            const serviceInstsance = props.getProviderInstance();
            await serviceInstsance.authorize();
            reset();
            props.navigation.navigate('SelectDefaultPlayList');
          }
          else {
            Alert.alert('Spotify App must be installed to use their services.');
          }
        });
    } catch (err) {
      console.log("Couldn't authorize with or connect to Spotify", err);
    }
  }

  const handleAuth = () => {
    setSpinner(true);
    setTimeout(async () => {
      try {
        await initService();
      } catch (err) {
        console.debug(err);
      }
      setSpinner(false);
    }, 500);
  };

  const handleSelect = (newProviderId: string) => {
    if (!newProviderId || newProviderId === props.providerId) return;

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
    props.setProviderId(newProviderId);
  };

  const onBeforeBack = () => {
    props.setProviderId('');
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      onBeforeBack={onBeforeBack}
    >
      <Spinner visible={spinner} />

      <Header styles={styles} />

      <Providers
        styles={{
          services: styles.services,
          image: styles.image,
          buttonText: styles.buttonText,
          button: styles.button,
        }}
        handleSelect={(name) => handleSelect(name)}
        providers={providers}
      />

      <LinearGradientButton
        onPress={() => handleAuth()}
        disabled={props.providerId === '' ? true : false}
      >
        Next
      </LinearGradientButton>
    </BackgroundContainer>
  );
};

const Header = ({ styles }: any) => (
  <List.Section style={styles.header}>
    <Text style={styles.title}>{Provider.title}</Text>
    <Text style={styles.paragraph}>{Provider.paragraph}</Text>
  </List.Section>
);

const Providers = ({ styles, handleSelect, providers }: iProviders )=> (
  <View style={styles.services}>
    {providers.map(({ name, img, selected }: iProvider, i: string | number | undefined) => (
      <TouchableOpacity
        key={i}
        activeOpacity={0.5}
        onPress={() => handleSelect(name)}
        style={
          selected ? styles.button : null
        }
      >
        <List.Item
          title={name}
          titleStyle={styles.buttonText}
          key={i}
          left={() => <Image
            source={img}
            style={styles.image}
            key={i}
          />}
        />
      </TouchableOpacity>
    ))}
  </View>
);


const mapStateToProps = (state: any) => {
  return {
    providerId: state.reducer.providerId,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
    getProviderInstance: () => dispatch(getProviderInstance()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SelectProvider));
