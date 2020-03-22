/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import jsx from './PlayListItem.style';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';

export interface iPlayListItem {
  theme: any,
  image: string,
  title: string,
  description: string,
  onPress?: () => void,
};

const PlayListItem = (props: iPlayListItem) => {
  const styles = jsx(props.theme);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={props.onPress}
    >

      {
        props.image ?
          <Image
            source={{
              uri: props.image,
            }}
            style={styles.image}
          /> :
          <Icon
            name='image-off'
            type='MaterialCommunityIcons'
            color={props.theme.fonts.color}
            size={styles.image.height}
          />
      }

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 8,
        }}

      >
        <View style={styles.descriptionContainer} >
          <Text style={styles.title} >{props.title}</Text>
          <Text style={styles.description} >{props.description}</Text>
        </View>

        {/* <LinearGradientButton
          width={Dimensions.get('window').width * 0.31}
        >
          Requested
        </LinearGradientButton> */}

      </View>
    </TouchableOpacity>
  );
};

export default withTheme(PlayListItem);
