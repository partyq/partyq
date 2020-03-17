/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import jsx from './PlayListItem.style';

export interface iPlayListItem {
  theme: any,
  navigate: any,
  image: string,
  title: string,
  description: string,
};

const PlayListItem = (props: iPlayListItem) => {
  const styles = jsx(props.theme);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => props.navigate('Party')}
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

      <View style={styles.descriptionContainer} >
        <Text style={styles.title} >{props.title}</Text>
        <Text style={styles.description} >{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(PlayListItem);
