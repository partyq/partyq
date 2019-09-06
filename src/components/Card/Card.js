/* eslint-disable no-unused-vars */
import React from 'react';
import CardView from 'react-native-cardview';
import { View, Image } from 'react-native';
import { withTheme } from 'react-native-paper';

import styles from './Card.style';

const Card = (props) => (
    <View style={styles.cardView}>
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
      >
        <Image
          source={{
            uri: props.uri,
          }}
          style={styles.image}
        />
      </CardView>
    </View>
);

export default withTheme(Card);
