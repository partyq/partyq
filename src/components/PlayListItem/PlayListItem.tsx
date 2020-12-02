/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { withTheme, List, Divider } from 'react-native-paper';

import jsx from './PlayListItem.style';

export interface iPlayListItem {
  theme: any,
  image: string,
  title: string,
  description: string,
  right?: () => React.ReactElement
};

const PlayListItem = (props: iPlayListItem) => {
  const styles = jsx(props.theme);

  return (
    <>
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
        right={props.right!}
      />
      <Divider />
    </>
  );
};

export default memo(withTheme(PlayListItem));
