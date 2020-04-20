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
import { withTheme, List } from 'react-native-paper';

import jsx from './PlayListItem.style';

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
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <List.Item
        style={styles.container}
        title={props.title}
        description={props.description}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        left={() =>
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
              size={styles.image.height}
            />
        }
      />
    </TouchableOpacity>
  );
};

export default withTheme(PlayListItem);
