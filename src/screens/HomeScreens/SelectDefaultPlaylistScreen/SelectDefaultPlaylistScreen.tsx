/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { withTheme, Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './SelectDefaultPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import SearchView from '../../../components/SearchView/SearchView';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import CustomButton, { MODE } from '../../../components/Button/CustomButton';
import { iPlayList, SearchType } from '../../../utility/MusicServices/SpotifyService';
import { getProviderInstance, setProviderId } from '../../../actions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
};

const SelectDefaultPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
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
      onBeforeBack={onBeforeBack}
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
        <CustomButton
          width={buttonWidth}
          mode={unselectButton.service ? MODE.TEXT : MODE.CONTAINED}
          onPress={() => handleButton('service')}
        >
          Spotify
        </CustomButton>
        <CustomButton
          width={buttonWidth}
          mode={unselectButton.library ? MODE.TEXT : MODE.CONTAINED}
          onPress={() => handleButton('library')}
        >
          Library
        </CustomButton>
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
              <PlayListItem
                image={item.image}
                title={item.title}
                description={`${item.numSongs} Songs`}
                key={index}
                onPress={() => onPlayListPress(item.id)}
              />
              <Divider />
            </View>
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

export default connect(null, mapDispatchToProps)(withTheme(SelectDefaultPlayListScreen));
