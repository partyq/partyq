/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { withTheme, Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './SelectDefaultPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import SearchView from '../../../components/SearchView/SearchView';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import { PlayList, SearchType } from '../../../utility/MusicServices/MusicService';
import { getProviderInstance, setProviderId } from '../../../actions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  ignoreSafeArea?: true,
  onBeforeBack?: () => void
};

const SelectDefaultPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [spotifyPlayList, setSpotifyPlayList] = useState<PlayList[] | undefined>(undefined);
  const [library, setLibrary] = useState<PlayList[] | undefined>(undefined);
  const [playListQuery, setPlayListQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<PlayList[] | undefined>(undefined);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  useEffect(() => {
    getPartyPlayLists();
  }, []);

  const getPartyPlayLists = async (): Promise<void> => {
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

  const getLibraryPLaylists = async (): Promise<void> => {
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

  const handleSearchPlayList = async (): Promise<void> => {
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

  const onBeforeBack = async (): Promise<void> => {
    props.setProviderId('');
  };

  const onPlayListPress = async (playListId: string): Promise<void> => {
    props.navigation.navigate('PreviewPlayList', { playListId });
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      onBeforeBack={props.onBeforeBack || onBeforeBack}
      ignoreSafeArea={props.ignoreSafeArea!}
      title={
        <Text style={styles.headingText}>Select a Playlist</Text>
      }
    >
      <SearchView
        onChangeText={handleQueryChange}
        onEndEditing={handleSearchPlayList}
        value={playListQuery}
      />
      <View style={styles.buttonsContainer}>
        <ThemedButton
          width={buttonWidth}
          mode={unselectButton.service ? MODE.TEXT : MODE.CONTAINED}
          onPress={() => handleButton('service')}
        >
          Spotify
        </ThemedButton>
        <ThemedButton
          width={buttonWidth}
          mode={unselectButton.library ? MODE.TEXT : MODE.CONTAINED}
          onPress={() => handleButton('library')}
        >
          Library
        </ThemedButton>
      </View>

      <View style={styles.listContainer}>
        <Divider />
        <FlatList
          data={searchResults
            ? searchResults : unselectButton.service === false
              ? spotifyPlayList : library
          }
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onPlayListPress(item.id)}
              >
                <PlayListItem
                  image={item.image}
                  title={item.title}
                  description={`${item.numSongs} Songs`}
                  key={index}
                  // onPress={() => onPlayListPress(item.id)}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item: PlayList) => item.id}
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

export default connect(null, mapDispatchToProps)(withTheme(SelectDefaultPlayListScreen));
