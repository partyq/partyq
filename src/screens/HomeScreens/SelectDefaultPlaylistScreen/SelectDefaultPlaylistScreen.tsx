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

import jsx from './SelectDefaultPlaylistScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import LinearGradientButton from '../../../components/LinearGradientButton/LinearGradientButton';
import { iPlayLists } from '../../../utility/MusicServices/SpotifyService';
import { getProviderInstance } from '../../../actions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  token: string,
  navigation: any,
  getProviderInstance: () => any,
};

const SelectDefaultPlaylistScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.4;

  const [featuredPlayList, setFeaturedPlayList] = useState<iPlayLists[] | undefined>(undefined);
  const [library, setLibrary] = useState<iPlayLists[] | undefined>(undefined);
  const [playListToSearch, setPlayListToSearch] = useState<string | undefined>(undefined);
  const [unselectButton, setUnselectedButton] = useState({
    service: false,
    library: true,
  });

  useEffect(() => {
    getFeaturedPLayLists();
  }, []);

  const getFeaturedPLayLists = async(): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getFeaturedPlayLists();
        setFeaturedPlayList(data);
      }
      else {
        setFeaturedPlayList(undefined);
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

  const handleButton = (id: string) => {
    if (id === 'service') {
      setUnselectedButton({ service: false, library: true });
    } else if (id === 'library') {
      setUnselectedButton({ service: true, library: false });
      getLibraryPLaylists();
    }
  };

  return (
    <BackgroundContainer navigation={props.navigation}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(SelectDefaultPlaylistScreen));
