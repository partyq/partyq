/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

// import jsx from './SelectDefaultPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import { PlaylistDetails, SearchType } from '../../../utility/MusicServices/MusicService';
import { getProviderInstance, setProviderId } from '../../../actions';
import SearchScreen from '../../../components/SearchScreen/SearchScreen';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  ignoreSafeArea?: true,
  onBeforeBack?: () => void,
  noHeader?: true
};

const SelectDefaultPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const getPartyPlayLists = async (): Promise<PlaylistDetails[]> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        return await instance.getPartyPlayLists();
      }
    }
    catch (error) {
      console.log(error);
    }
    return []
  };

  const getLibraryPLaylists = async (): Promise<PlaylistDetails[]> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        return await instance.getLibraryPlayLists();
      }
    }
    catch (error) {
      console.log(error);
    }
    return [];
  };

  const handleSearchPlayList = async (query: string): Promise<PlaylistDetails[]> => {
    if (!query) return [];
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        return await instance.getSearchResults(query, SearchType.PLAYLIST);
      }
    }
    catch (error) {
      console.log(error);
    }
    return [];
  };

  const onBeforeBack = async (): Promise<void> => {
    props.setProviderId('');
  };

  const onPlayListPress = async (playlistDetails: PlaylistDetails): Promise<void> => {
    props.navigation.navigate('PreviewPlayList', {
      playlistDetails: playlistDetails,
      readOnly: false
    });
  };

  return (
    <SearchScreen
      search={handleSearchPlayList}
      getServiceData={getPartyPlayLists}
      getLibraryData={getLibraryPLaylists}
      renderItem={({item, index}) => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onPlayListPress(item)}
          >
            <PlayListItem
              image={item.imageUri}
              title={item.title}
              description={`${item.totalTracks} Songs`}
              key={index}
              // onPress={() => onPlayListPress(item.id)}
            />
          </TouchableOpacity>
        </View>
      )}
      onBeforeBack={props.onBeforeBack || onBeforeBack}
      navigation={props.navigation}
      ignoreSafeArea={props.ignoreSafeArea!}
      noHeader={props.noHeader}
      title='Select a Playlist'
      keyExtractor={(item: PlaylistDetails) => item.playlistId}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(SelectDefaultPlayListScreen));
