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
import { createParty, setPlaylistTracks, appendPlaylistTracks, setPageNumber, setPlaylistDetails } from '../../../actions/partyActions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  playlistDetails: PlaylistDetails | undefined,
  ignoreSafeArea?: true,
  onFinish?: (playlistId: string) => void,
  route: any,
  createParty: (playlistDetails: PlaylistDetails, provider: any) => any,
  noHeader?: true,
  setPlaylistTracks: (tracksToSet: Track[] | undefined) => void,
  appendPlaylistTracks: (tracksToAppend: Track[]) => void,
  playlistTracks: Track[] | undefined,
  pageNumber: number,
  setPageNumber: (pageNumber: number) => void,
  setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => void,
};

export interface iTracksSectionProps {
  style: any,
  tracks: Track[],
  handleLoadMore: () => void,
  totalTracks: number,
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

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.5;
  const [isFinishPressed, setIsFinishPressed] = useState<boolean>(false);

  const {
    setPlaylistDetails
  } = props;

  const {
    playlistDetails,
    readOnly
  } = props.route.params;

  useEffect(() => {
    if (props.playlistDetails && props.pageNumber === 0 && props.playlistTracks === undefined) {
      console.debug('getTracks', {
        pageNumber: props.pageNumber
      })
      getTracks(props.pageNumber);
    }
  }, [props.pageNumber, props.playlistDetails, props.playlistTracks]);

  useEffect(() => {
    if (props.pageNumber > 0) {
      getTracks(props.pageNumber);
    }
  }, [props.pageNumber]);

  const getTracks = async(pageNumber: number): Promise<void> => {

    try {
      const instance = props.getProviderInstance();
      const newTracks: Track[] = await instance.getTracks(props.playlistDetails?.playlistId, pageNumber);

      if (props.playlistTracks) {
        props.appendPlaylistTracks(newTracks);
      }
      else {
        props.setPlaylistTracks(newTracks);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    props.setPageNumber(props.pageNumber + 1);
  };

  const onBeforeBack = () => {
    props.setPlaylistTracks(undefined);
    props.setPageNumber(0);
    props.setPlaylistDetails(undefined);
  }

  const finish = async(): Promise<void> => {
    if (props.playlistDetails === undefined) {
      Alert.alert('Something went wrong');
      return;
    }

    setIsFinishPressed(true);
    setPlaylistDetails(playlistDetails)
    if (props.onFinish) {
      props.onFinish(props.playlistDetails?.playlistId);
    } else {
      try {
        const instance = props.getProviderInstance();
        await props.createParty(props.playlistDetails, instance);
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
      onBeforeBack={onBeforeBack}
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
      {props.playlistTracks !== undefined && props.playlistDetails &&
        <Tracks
          style={styles.listContainer}
          tracks={props.playlistTracks}
          handleLoadMore={handleLoadMore}
          totalTracks={props.playlistDetails?.totalTracks}
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

const Tracks = ({ style, tracks, handleLoadMore, totalTracks, pageNumber }: iTracksSectionProps) => {
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
        ListFooterComponent={pageNumber * 10 <= totalTracks ? <LoadingIndicator/> : null}
        onEndReached={() => pageNumber * 10 <= totalTracks ? handleLoadMore() : null}
        onEndReachedThreshold={0}
        initialNumToRender={10}
      />
    </View>
  )
};

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
    setPlaylistTracks: (tracksToSet: Track[] | undefined) => dispatch(setPlaylistTracks(tracksToSet)),
    appendPlaylistTracks: (tracksToAppend: Track[]) => dispatch(appendPlaylistTracks(tracksToAppend)),
    setPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber)),
    setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => dispatch(setPlaylistDetails(playlistDetails)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PreviewPlayListScreen));