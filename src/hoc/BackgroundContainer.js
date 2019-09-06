/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const BackgroundContainer = (props) => {
  const { theme } = props;

  const handleNavigate = () => props.navigation.goBack();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[theme.colors.backgroundLight, theme.colors.backgroundDark]}
      style={{ flex: 1 }}>

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
                name='md-arrow-round-back'
                type='ionicon'
                color={theme.colors.primaryAccent}
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
