/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme, ProgressBar } from 'react-native-paper';
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
            paddingTop: 14,
            paddingLeft: 14,
          }}>
          <Button
            icon={
              <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={theme.fonts.color}
                size={theme.fonts.medium.fontSize}
              />
            }
            buttonStyle={{
              backgroundColor: 'transparent',
              borderRadius: theme.roundness,
              alignSelf: 'center',
              paddingRight: theme.fonts.small,
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
            padding: 14
          }}>
            {props.children}
          </View>
        </>
      }

    </View>
  );
};

export default withTheme(BackgroundContainer);
