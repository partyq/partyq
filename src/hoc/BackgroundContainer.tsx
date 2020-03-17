/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { View, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import InternetStatus from '../components/InternetStatus/InternetStatus';

const BackgroundContainer = (props: any) => {
  const { theme } = props;

  const handleNavigate = () => {
    props.navigation.goBack();
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[theme.colors.backgroundLight, theme.colors.backgroundDark]}
      style={{ flex: 1 }}>

      {
        props.progress
          ? <SafeAreaView>
            <ProgressBar
              progress={props.progress}
              color={theme.colors.primaryAccent}
            />
          </SafeAreaView>
          : null
      }

      <StatusBar hidden />
      <InternetStatus />

      {props.disableBack ? null

        : <SafeAreaView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            paddingTop: theme.fonts.small,
            paddingLeft: theme.fonts.small,
          }}>
          <Button
            icon={
              <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={theme.fonts.color}
                size={theme.fonts.medium}
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
          {props.children}
        </>
      }

    </LinearGradient>
  );
};

export default withTheme(BackgroundContainer);
