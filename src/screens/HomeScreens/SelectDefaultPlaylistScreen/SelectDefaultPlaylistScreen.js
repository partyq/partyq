/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios';

import jsx from './SelectDefaultPlaylistScreen.style';
import { TEST_SERVICE_DATA, TEST_LIBRARY_DATA } from '../../../config/RenderableData';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

const SelectDefaultPlaylistScreen = (props) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [featuredPlayList, setFeaturedPlayList] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [playListToSearch, setPlayListToSearch] = useState(undefined);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  const getFeaturedPlayList = async() => {
    const URL = 'https://api.spotify.com/v1/browse/featured-playlists'; 
    const config = { headers: { Authorization: `Bearer ${props.token}` } };    
    const result = await axios.get(URL, config);
    const playLists = [];
    
    result.data.playlists.items.forEach(item => {
      playLists.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : null,
        title: item.name,
        numSongs: item.tracks.total,
      });
    });

    setFeaturedPlayList(playLists);
  };

  const getLibrary = async() => {
    const URL = 'https://api.spotify.com/v1/me/playlists'; 
    const config = { headers: { Authorization: `Bearer ${props.token}` } };    
    const result = await axios.get(URL, config);
    const playLists = [];
    
    result.data.items.forEach(item => {
      playLists.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : null,
        title: item.name,
        numSongs: item.tracks.total,
      });
    });

    setLibrary(playLists);
  };

  useEffect(async () => {
    getFeaturedPlayList();
  }, []);

  const handleButton = (id) => {
    if (id === 'service') {
      setUnselectedButton({ service: false, library: true });
    } else if (id === 'library') {
      setUnselectedButton({ service: true, library: false });
      getLibrary();
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
          Spotify
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
          data={unselectButton.service === false ? featuredPlayList : library}
          renderItem={({ item, index }) => (
            <PlayListItem
              image={item.image}
              title={item.title}
              description={`${item.numSongs} Songs`}
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
};

export default connect(mapStateToProps, null)(withTheme(SelectDefaultPlaylistScreen));
