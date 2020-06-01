import React from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import {
  withTheme,
  IconButton,
  Text,
} from 'react-native-paper';

import jsx from './PartyOverlay.style';

export interface iPartyOverlayProps {
  title?: string,
  children: React.ReactElement[] | React.ReactElement,
  noHeader?: true,
  closeOverlay: () => void,
  theme: any,
}

const PartyOverlay = (props: iPartyOverlayProps) => {
  const styles = jsx(props.theme);

  return (
    <>
      {!props.noHeader && (
        <View style={styles.overlayView}>
          <IconButton
            icon='close'
            onPress={props.closeOverlay}
          />
          {props.title && (
            <Text style={styles.pageTitle}>
              {props.title}
            </Text>
          )}
          <IconButton
            icon=''
            onPress={() => null}
            disabled
          />
        </View>
      )}
      {props.children}
    </>
  )
}

export default withTheme(PartyOverlay);