/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import jsx from './SelectDefaultPlaylistScreen.style';
import { TEST_SERVICE_DATA, TEST_LIBRARY_DATA } from '../../../config/RenderableData';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';

const SelectDefaultPlaylistScreen = (props) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [playListToSearch, setPlayListToSearch] = useState(TEST_SERVICE_DATA);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  const handleButton = (id) => {
    if (id === 'service') {
      setUnselectedButton({ service: false, library: true });
      setPlayListToSearch(TEST_SERVICE_DATA);
    } else if (id === 'library') {
      setUnselectedButton({ service: true, library: false });
      setPlayListToSearch(TEST_LIBRARY_DATA);
    }
  };

  return (
    <BackgroundContainer style={styles.container} navigation={props.navigation}
      title={
        <Text style={styles.headingText}>Select a Playlist</Text>
      }
    >
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder='Search'
          round={true}
          lightTheme={true}
          onChangeText={(_playListToSearch) => setPlayListToSearch(_playListToSearch)}
          value={playListToSearch}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.inputText}
        />
      </View>
      <View style={styles.buttonsContainer}>

        <LinearGradientButton
          width={buttonWidth}
          unselected={unselectButton.service}
          onPress={() => handleButton('service')}
        >
          Sound Cloud
                </LinearGradientButton>

        <LinearGradientButton
          width={buttonWidth}
          unselected={unselectButton.library}
          onPress={() => handleButton('library')}
        >
          Your Library
                </LinearGradientButton>

      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={playListToSearch}
          renderItem={({ item, index }) => (
            <PlayListItem
              image={item.image}
              title={item.title}
              description={item.description}
              key={index}
              navigate={props.navigation.navigate}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </BackgroundContainer>
  );
};

export default withTheme(SelectDefaultPlaylistScreen);
