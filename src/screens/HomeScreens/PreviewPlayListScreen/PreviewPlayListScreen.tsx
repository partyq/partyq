/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {
  withTheme,
  Text,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import jsx from './PreviewPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import {
  iPlayList,
  iTrack,
  iPlayListDetails,
} from '../../../utility/MusicServices/SpotifyService';
import {
  getProviderInstance,
  setProviderId,
} from '../../../actions';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import { createParty } from '../../../actions/partyActions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  playListDetails: iPlayList,
  route: any,
  createParty: (
    playlistId: string, 
    provider: any, 
    callback: (() => void) | undefined) => void
};

export interface iTracksSectionProps {
  style: any,
  tracks: iTrack[],
};

export interface iPlayListDescription {
  styles: any,
  playList: iPlayListDetails,
  onPress: () => void,
  buttonWidth: number,
};

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.5;

  const playListId = props.route.params.playListId;
  const [playList, setPlayList] = useState<iPlayListDetails | undefined>(undefined);
  const [spinner, setSpinner] = useState<boolean>(true);

  useEffect(() => {
    getPlayList();
  }, []);

  const getPlayList = async (): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getPlayList(playListId);
        setPlayList(data);
        setSpinner(false);
      }
      else {
        setPlayList(undefined);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const finish = (): void => {
    const instance = props.getProviderInstance();
    props.createParty(playListId, instance, () => {
      props.navigation.navigate('PartyMain');
    })
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      title={
        <Text style={styles.headingText}>Preview PlayList</Text>
      }
    >
      <Spinner visible={spinner} />

      {playList ?
        <PlayListDescription 
          styles={styles}
          playList={playList}
          onPress={finish}
          buttonWidth={buttonWidth}
        />
        : null
      }
      {playList ?
        <Tracks style={styles.listContainer} tracks={playList.tracks} />
        : null
      }
    </BackgroundContainer>
  );
};

const PlayListDescription = ({ styles, playList, onPress, buttonWidth }: iPlayListDescription) => (
  <View style={styles.playListDescriptionContainer}>
    <View style={styles.panel}>
      <Image
        source={{
          uri: playList.image,
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <View>
          <Text
            style={styles.title}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {playList.title}
          </Text>
          <Text style={styles.numSongs}>{`${playList.tracks.length} Songs`}</Text>
        </View>
        <ThemedButton
          mode={MODE.CONTAINED}
          onPress={onPress}
          width={buttonWidth}
        >
          SELECT PLAYLIST
        </ThemedButton>
      </View>
    </View>
    {
      playList.description ? 
      <>
        <Divider />
        <Text style={styles.description}>{playList.description}</Text>
      </>
      : null
    }
  </View>
);

const Tracks = ({ style, tracks }: iTracksSectionProps) => (
  <View style={style}>
    <Divider />
    <FlatList
      data={tracks}
      renderItem={({ item }) => (
        <PlayListItem
          image={item.image}
          title={item.title}
          description={`By: ${item.artists}`}
          key={item.id}
        />
      )}
      keyExtractor={(item: iTrack) => item.id}
    />
  </View>
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
    createParty: (
      playlistId: string, 
      provider: any, 
      callback: (() => void) | undefined) => dispatch(createParty(playlistId, provider, callback))
  }
};

export default connect(null, mapDispatchToProps)(withTheme(PreviewPlayListScreen));