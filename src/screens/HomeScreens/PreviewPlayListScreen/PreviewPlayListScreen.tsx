/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Alert,
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
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import {
  Track,
  PlaylistDetails,
} from '../../../utility/MusicServices/MusicService';
import {
  getProviderInstance,
  setProviderId,
} from '../../../actions';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import { createParty, setPlaylistTracks, setPageNumber, setPlaylistDetails } from '../../../actions/partyActions';
import usePrevious from '../../../hooks/usePrevious';
import { PlaylistTracks } from '../../../utility/MusicServices/MusicService';

export interface iPreviewPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  playlistDetails: PlaylistDetails | undefined,
  ignoreSafeArea?: true,
  onFinish?: (playlistDetails: PlaylistDetails) => void,
  route: any,
  createParty: (playlistDetails: PlaylistDetails, provider: any) => any,
  noHeader?: true,
  setPlaylistTracks: (tracksToAppend: PlaylistTracks | undefined) => void,
  playlistTracks: PlaylistTracks | undefined,
  pageNumber: number,
  setPageNumber: (pageNumber: number) => void,
  setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => void,
};

export interface iTracksSectionProps {
  style: any,
  playlistTracks: PlaylistTracks,
  handleLoadMore: () => void,
  pageNumber: number,
};

export interface iPlayListDescription {
  styles: any,
  playlistDetails: PlaylistDetails,
  onPress: () => void,
  buttonWidth: number,
  disabled: boolean,
  readOnly: boolean
};

const PreviewPlayListScreen = (props: iPreviewPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.5;
  const [isFinishPressed, setIsFinishPressed] = useState<boolean>(false);
  const prevPageNumber = usePrevious(props.pageNumber);

  const {
    readOnly
  } = props.route.params;

  useEffect(() => {
    if (props.playlistDetails && props.pageNumber === 1 && props.playlistTracks === undefined) {
      console.warn('Grab more tracks bitch');
      getTracks(props.pageNumber);
    }
  }, [props.pageNumber, props.playlistDetails, props.playlistTracks]);

  useEffect(() => {
    if (
      props.pageNumber > 1 &&
      props.playlistDetails !== undefined &&
      props.playlistTracks?.tracksLeftToFetch !== 0 &&
      prevPageNumber !== props.pageNumber
    ) {
      console.warn('get more tracks: ', {
        prevPageNumber,
        currentPageNumber: props.pageNumber,
      })
      getTracks(props.pageNumber);
    }
  }, [props.pageNumber, prevPageNumber]);

  const handleLoadMore = () => {
    props.setPageNumber(props.pageNumber + 1);
  };

  const getTracks = async (pageNumber: number): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      const newTracks: PlaylistTracks = await instance.getTracks(props.playlistDetails?.playlistId, pageNumber);
      props.setPlaylistTracks(newTracks);
    }
    catch (error) {
      console.error(error);
    }
  };

  const onBeforeBack = async (): Promise<void> => {
    if (!props.onFinish) {
      props.setPlaylistTracks(undefined);
      props.setPageNumber(1);
      props.setPlaylistDetails(undefined);
    }
  }

  const finish = async (): Promise<void> => {
    if (props.playlistDetails === undefined) {
      Alert.alert('Something went wrong');
      return;
    }

    setIsFinishPressed(true);

    if (props.onFinish) {
      props.onFinish(props.playlistDetails);
    } else {
      try {
        const instance = props.getProviderInstance();
        await props.createParty(props.playlistDetails, instance);
        props.navigation.navigate('PartyMain');
      }
      catch (error) {
        console.log(error)
        Alert.alert(error);
      }
    }
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      ignoreSafeArea={props.ignoreSafeArea!}
      noHeader={props.noHeader}
      onBeforeBack={onBeforeBack}
      title={
        <Text style={styles.headingText}>Preview PlayList</Text>
      }
    >
      {props.playlistDetails &&
        <PlayListDescription
          styles={styles}
          playlistDetails={props.playlistDetails}
          onPress={finish}
          buttonWidth={buttonWidth}
          disabled={isFinishPressed}
          readOnly={readOnly}
        />
      }
      {props.playlistTracks !== undefined && props.playlistDetails &&
        <Tracks
          style={styles.listContainer}
          playlistTracks={props.playlistTracks}
          handleLoadMore={handleLoadMore}
          pageNumber={props.pageNumber}
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
    {playlistDetails.description &&
      <>
        <Divider />
        <Text style={styles.description}>{playlistDetails.description}</Text>
      </>
    }
  </View>
);

const Tracks = ({ style, playlistTracks, handleLoadMore, pageNumber }: iTracksSectionProps) => (
  <View style={style}>
    <Divider />
    <FlatList
      data={playlistTracks.tracks}
      renderItem={({ item }) => (
        <PlayListItem
          image={item.imageUri}
          title={item.title}
          description={`By: ${item.artists}`}
          key={item.trackUri}
        />
      )}
      keyExtractor={(item: Track) => item.trackUri}
      ListFooterComponent={playlistTracks?.tracksLeftToFetch === 0 ? <LoadingIndicator /> : null}
      onMomentumScrollEnd={() => playlistTracks?.tracksLeftToFetch === 0 && handleLoadMore()}
      onEndReachedThreshold={0}
      initialNumToRender={50}
    />
  </View>
);

const mapStateToProps = (state: any) => ({
  playlistDetails: state.partyReducer.playlistDetails,
  playlistTracks: state.partyReducer.playlistTracks,
  pageNumber: state.partyReducer.pageNumber,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
    createParty: (playlistDetails: PlaylistDetails, provider: any) => dispatch(createParty(playlistDetails, provider)),
    setPlaylistTracks: (tracksToAppend: PlaylistTracks | undefined) => dispatch(setPlaylistTracks(tracksToAppend)),
    setPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber)),
    setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => dispatch(setPlaylistDetails(playlistDetails)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PreviewPlayListScreen));