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

import jsx from './PreviewPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
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

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [partyPlayList, setPartyPlayList] = useState<iPlayList[] | undefined>(undefined);
  const [library, setLibrary] = useState<iPlayList[] | undefined>(undefined);
  const [playListQuery, setPlayListQuery] = useState<string | undefined>(undefined);
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
        setPartyPlayList(data);
      }
      else {
        setPartyPlayList(undefined);
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
    setPlayListQuery(undefined);
    
    if (id === 'service') {
      setUnselectedButton({ service: false, library: true });
    } else if (id === 'library') {
      setUnselectedButton({ service: true, library: false });
      getLibraryPLaylists();
    }
  };

  const handlePlayListQuery = (query: string): void => {
    if (query) setPlayListQuery(query);
    else setPlayListQuery(undefined);
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
    props.navigation.navigate('PartyMain');
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
        <SearchBar
          placeholder='Search'
          round={true}
          lightTheme={true}
          onChangeText={(query) => handlePlayListQuery(query)}
          onEndEditing={handleSearchPlayList}
          value={playListQuery}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.inputText}
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
          data={searchResults ? searchResults : unselectButton.service === false ? partyPlayList : library}
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

export default connect(null, mapDispatchToProps)(withTheme(PreviewPlayListScreen));
