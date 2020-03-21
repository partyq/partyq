/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './SelectDefaultPlaylistScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import SearchView from '../../../components/SearchView/SearchView';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import { iPlayList, SearchType } from '../../../utility/MusicServices/SpotifyService';
import { getProviderInstance, setProviderId } from '../../../actions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
};

const SelectDefaultPlaylistScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [spotifyPlayList, setSpotifyPlayList] = useState<iPlayList[] | undefined>(undefined);
  const [library, setLibrary] = useState<iPlayList[] | undefined>(undefined);
  const [playListQuery, setPlayListQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<iPlayList[] | undefined>(undefined);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  useEffect(() => {
    getPartyPlayLists();
  }, []);

  const getPartyPlayLists = async(): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getPartyPlayLists();
        setSpotifyPlayList(data);
      }
      else {
        setSpotifyPlayList(undefined);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const getLibraryPLaylists = async(): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getLibraryPlayLists();
        setLibrary(data);
      }
      else {
        setLibrary(undefined);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleButton = (id: string): void => {
    setSearchResults(undefined);
    setPlayListQuery('');
    
    if (id === 'service') {
      setUnselectedButton({ service: false, library: true });
    } else if (id === 'library') {
      setUnselectedButton({ service: true, library: false });
      getLibraryPLaylists();
    }
  };

  const handleQueryChange = (query: string): void => {
    if (query) {
      setPlayListQuery(query);
    }
    else {
      setPlayListQuery('');
      setSearchResults(undefined);
    }
  };

  const handleSearchPlayList = async(): Promise<void> => {
    if (!playListQuery) return;
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getSearchResults(playListQuery, SearchType.PLAYLIST);
        setSearchResults(data);
      }
      else {
        setSearchResults(undefined);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const onBeforeBack = async(): Promise<void> => {
    props.setProviderId('');
  };

  const onPlayListPress = async(playlist: iPlayList): Promise<void> => {
    console.log(playlist);
    props.navigation.navigate('PreviewPlayList');
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      onBeforeBack={onBeforeBack}
      title={
        <Text style={styles.headingText}>Select a Playlist</Text>
      }
    >
      <View style={styles.searchContainer}>
        <SearchView
          onChangeText={handleQueryChange}
          onEndEditing={handleSearchPlayList}
          value={playListQuery}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <LinearGradientButton
          width={buttonWidth}
          unselected={unselectButton.service}
          type={unselectButton.service ? 'clear' : 'solid'}
          onPress={() => handleButton('service')}
        >
          Spotify
        </LinearGradientButton>
        <LinearGradientButton
          width={buttonWidth}
          unselected={unselectButton.library}
          type={unselectButton.library ? 'clear' : 'solid'}
          onPress={() => handleButton('library')}
        >
          Your Library
        </LinearGradientButton>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={searchResults ? searchResults : unselectButton.service === false ? spotifyPlayList : library}
          renderItem={({ item, index }) => (
            <PlayListItem
              image={item.image}
              title={item.title}
              description={`${item.numSongs} Songs`}
              key={index}
              onPress={() => onPlayListPress(item)}
            />
          )}
          keyExtractor={(item: iPlayList) => item.id}
        />
      </View>
    </BackgroundContainer>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(SelectDefaultPlaylistScreen));
