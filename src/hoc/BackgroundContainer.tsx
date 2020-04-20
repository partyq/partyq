/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Button } from 'react-native-elements';
import { View, StatusBar } from 'react-native';

import InternetStatus from '../components/InternetStatus/InternetStatus';

const BackgroundContainer = (props: any) => {
  const { theme } = props;

  const handleNavigate = async(): Promise<void> => {
    if (props.onBeforeBack) 
      await props.onBeforeBack();
      
    props.navigation.goBack();
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background}}>

      <StatusBar hidden />
      <InternetStatus />

      {props.disableBack ? null
        : <SafeAreaView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <Button
            icon={
              <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={theme.colors.text}
                size={24}
              />
            }
            buttonStyle={{
              backgroundColor: 'transparent',
              borderRadius: theme.roundness,
              alignSelf: 'center',
              margin: 8,
            }}
            onPress={handleNavigate}
          />
          {props.title}
        </SafeAreaView>
      }

      {props.style
        ? <View style={props.style}>
          {props.children}
        </View>
        : <>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 14,
          }}>
            {props.children}
          </View>
        </>
      }

    </View>
  );
};

export default withTheme(BackgroundContainer);
