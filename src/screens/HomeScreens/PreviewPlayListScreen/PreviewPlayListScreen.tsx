/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  withTheme,
  Text,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './PreviewPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import {
  Track,
  PlaylistDetails,
} from '../../../utility/MusicServices/MusicService';
import {
  getProviderInstance,
  setProviderId,
} from '../../../actions';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { createParty, setPlaylistDetails } from '../../../actions/partyActions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  ignoreSafeArea?: true,
  onFinish?: (playlistId: string) => void,
  route: any,
  createParty: (playlistId: string, provider: any) => any,
  setPlaylistDetails: (playlistDetails: PlaylistDetails) => void,
  noHeader?: true
};

export interface iTracksSectionProps {
  style: any,
  tracks: Track[],
  handleLoadMore: () => void,
  totalTracks: number
};

export interface iPlayListDescription {
  styles: any,
  playlistDetails: PlaylistDetails,
  onPress: () => void,
  buttonWidth: number,
  disabled: boolean,
  readOnly: boolean
};

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.5;

  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [isFinishPressed, setIsFinishPressed] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    setPlaylistDetails
  } = props;

  const {
    playlistDetails,
    readOnly
  } = props.route.params;

  useEffect(() => {
    if (playlistDetails.playlistId) {
      getTracks(pageNumber);
    }
    else {
      Alert.alert('Something went wrong');
    }
  }, [pageNumber, playlistDetails]);

  const getTracks = async (pageNumber: number): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data: Track[] = await instance.getTracks(playlistDetails.playlistId, pageNumber);

        const newTracks: Track[] | undefined = tracks !== undefined ?
          [...tracks, ...data]:
          [...data];

        setTracks(newTracks);
      }
      else {
        setTracks(undefined);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const finish = async(): Promise<void> => {
    setIsFinishPressed(true);
    setPlaylistDetails(playlistDetails)
    if (props.onFinish) {
      props.onFinish(playlistDetails.playlistId);
    } else {
      try {
        const instance = props.getProviderInstance();
        await props.createParty(playlistDetails.playlistId, instance);
        props.navigation.navigate('PartyMain');
      }
      catch (error) {
        Alert.alert(error);
      }
    }
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      ignoreSafeArea={props.ignoreSafeArea!}
      noHeader={props.noHeader}
      title={
        <Text style={styles.headingText}>Preview PlayList</Text>
      }
    >

      {playlistDetails &&
        <PlayListDescription 
          styles={styles}
          playlistDetails={playlistDetails}
          onPress={finish}
          buttonWidth={buttonWidth}
          disabled={isFinishPressed}
          readOnly={readOnly}
        />
      }
      {tracks !== undefined &&
        <Tracks
          style={styles.listContainer}
          tracks={tracks}
          handleLoadMore={handleLoadMore}
          totalTracks={playlistDetails.totalTracks}
        />
      }
    </BackgroundContainer>
  );
};

const PlayListDescription = ({ styles, playlistDetails, onPress, buttonWidth, disabled, readOnly }: iPlayListDescription) => (
  <View style={styles.playListDescriptionContainer}>
    <View style={styles.panel}>
      <Image
        source={{
          uri: playlistDetails.imageUri,
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
            {playlistDetails.title}
          </Text>
          <Text style={styles.numSongs}>{`${playlistDetails.totalTracks} Songs`}</Text>
        </View>
        {!readOnly && (
          <ThemedButton
            mode={MODE.CONTAINED}
            onPress={onPress}
            width={buttonWidth}
            size='sm'
            disabled={disabled}
          >
            SELECT PLAYLIST
          </ThemedButton>
        )}
      </View>
    </View>
    {
      playlistDetails.description ? 
      <>
        <Divider />
        <Text style={styles.description}>{playlistDetails.description}</Text>
      </>
      : null
    }
  </View>
);

const RenderFooter = () => (
  <ActivityIndicator animating size='small' />
);

const Tracks = ({ style, tracks, handleLoadMore, totalTracks }: iTracksSectionProps) => {
  return (
    <View style={style}>
      <Divider />
      <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <PlayListItem
            image={item.imageUri}
            title={item.title}
            description={`By: ${item.artists}`}
            key={item.trackUri}
          />
        )}
        keyExtractor={(item: Track) => item.trackUri}
        ListFooterComponent={totalTracks !== tracks?.length ? RenderFooter : null}
        onEndReached={() => totalTracks !== tracks?.length ? handleLoadMore() : null}
        onEndReachedThreshold={0}
      />
    </View>
  )
};

const mapStateToProps = (state: any) => ({
  // playlistDetails: state.partyReducer.playlistDetails
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
    createParty: (playlistId: string, provider: any) => dispatch(createParty(playlistId, provider)),
    setPlaylistDetails: (playlistDetails: PlaylistDetails) => dispatch(setPlaylistDetails(playlistDetails))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PreviewPlayListScreen));