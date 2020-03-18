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
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  token: string,
  navigation: any,
};

export interface iPlayLists {
  id: string,
  uri: string,
  image: string,
  title: string,
  numSongs: string,
};

const SelectDefaultPlaylistScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [featuredPlayList, setFeaturedPlayList] = useState<iPlayLists[]|undefined>(undefined);
  const [library, setLibrary] = useState<iPlayLists[]|undefined>(undefined);
  const [playListToSearch, setPlayListToSearch] = useState<string|undefined>(undefined);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  const getFeaturedPlayList = async() => {
    const URL = 'https://api.spotify.com/v1/browse/featured-playlists'; 
    const config = { headers: { Authorization: `Bearer ${props.token}` } };    
    const result = await axios.get(URL, config);
    const playLists: iPlayLists[] = [];
    
    result.data.playlists.items.forEach((item: any) => {
      playLists.push({
        id: item.id,
        uri: item.uri,
        image: item.images.length ? item.images[0].url : undefined,
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
    const playLists: iPlayLists[] = [];
    
    result.data.items.forEach((item: any) => {
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

  useEffect(() => {
    getFeaturedPlayList();
  }, []);

  const handleButton = (id: string) => {
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
          keyExtractor={(item: iPlayLists) => item.id}
        />
      </View>
    </BackgroundContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    providerId: state.reducer.providerId,
  }
};

export default connect(mapStateToProps, null)(withTheme(SelectDefaultPlaylistScreen));
