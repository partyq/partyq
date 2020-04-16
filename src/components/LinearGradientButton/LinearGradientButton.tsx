/* eslint-disable no-unused-vars */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import jsx from './LinearGradientButton.style';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface iLinearGradientButton {
  theme: any,
  width?: number,
  unselected?: boolean,
  children?: any,
  underline?: boolean,
  smallFont?: boolean,
  disabled?: boolean,
  type?: "solid" | "clear" | "outline" | undefined,
  onPress?: () => void;
}

const LinearGradientButton = (props: iLinearGradientButton) => {
  const styles = jsx(props.theme, props.width ? props.width : '100%');

  return (
    <SafeAreaView style={{width: props.width ? props.width : '100%'}}>
      <Button
        title={props.children}
        titleStyle={[
          styles.text,
          props.type === 'outline' || props.type === 'clear' ? {
            color: props.theme.colors.primary
          } : {},
          props.underline ? { textDecorationLine: 'underline', textDecorationColor: props.theme.fonts.color } : {},
          props.smallFont ? { fontSize: props.theme.fonts.small } : {},
        ]}
        type={props.type}
        disabled={props.disabled}
        containerStyle={styles.container}
        buttonStyle={[
          styles.button,
          props.type === 'outline' ? {
            borderColor: props.theme.colors.primary,
            borderWidth: 3,
          } : {},
        ]}
        onPress={props.onPress}
        ViewComponent={(props.unselected || props.type === 'outline' || props.type === 'clear') ? undefined : LinearGradient}
        linearGradientProps={(props.unselected || props.type === 'outline' || props.type === 'clear') ? undefined : {
          colors: [styles.colorBegin.color, styles.colorEnd.color],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      />
    </SafeAreaView>
  );
};

export default withTheme(LinearGradientButton);
