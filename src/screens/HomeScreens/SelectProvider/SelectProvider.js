/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import { Services } from '../../../config/RenderableData';

const SelectProvider = (props) => {
  const styles = jsx(props.theme);

  const handleSelected = (name) => {
    props.navigation.navigate('SelectDefaultPlayList');
  };

  const renderService = () => (
    <View style={styles.services}>
      {Services.services.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.5}
          onPress={() => handleSelected(item.name)}
          style={styles.button}
        >
          <Image
            source={item.img}
            style={styles.image}
            key={i}
            width={props.theme.fonts.medium}
            height={props.theme.fonts.medium}
          />
          <Text style={styles.buttonText} key={i}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation}>
      <View style={styles.header}>
        <Text style={styles.title}>{Services.title}</Text>
        <Text style={styles.paragraph}>{Services.paragraph}</Text>
      </View>
      {renderService()}
      {/* <LinearGradientButton onPress={handleAuth}>Finish</LinearGradientButton> */}
    </BackgroundContainer>
  );
};

export default withTheme(SelectProvider);
