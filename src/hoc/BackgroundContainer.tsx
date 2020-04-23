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

  const mainContent = (
    <>
      <View
        style={{
          // paddingTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'transparent',
          justifyContent: 'space-between'
        }}
      >
        {props.disableBack ? null
          : <Button
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
                margin: 8
              }}
              onPress={handleNavigate}
            />
        }
        {props.title}
        <View
          style={{
            width: 40
          }}
        />
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 14,
        paddingBottom: 14,
        ...props.style
      }}>
        {props.children}
      </View>
    </>
  )

  return (
    <View
      style={{ 
        flex: 1,
        flexDirection: 'column',
        backgroundColor: props.style ? 
          props.style.backgroundColor || theme.colors.white : 
          theme.colors.background
      }}
    >

      <StatusBar 
        barStyle={props.statusBarStyle || 'dark-content'}
      />
      <InternetStatus />

      {props.ignoreSafeArea ?
        mainContent
        : <SafeAreaView
            style={{
              flex: 1
            }}
          >
            {mainContent}
          </SafeAreaView>
      }

    </View>
  );
};

export default withTheme(BackgroundContainer);
