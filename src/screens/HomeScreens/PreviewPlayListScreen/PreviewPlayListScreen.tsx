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
import Spinner from 'react-native-loading-spinner-overlay';

import jsx from './PreviewPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import {
  PlayList,
  Track,
  PlayListDetails,
} from '../../../utility/MusicServices/MusicService';
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
  // playListDetails: PlayList,
  ignoreSafeArea?: true,
  onFinish?: (playlistId: string) => void,
  route: any,
  createParty: (playlistId: string, provider: any) => any,
  noHeader?: true
};

export interface iTracksSectionProps {
  style: any,
  tracks: Track[],
};

export interface iPlayListDescription {
  styles: any,
  playList: PlayListDetails,
  onPress: () => void,
  buttonWidth: number,
  disabled: boolean,
};

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const buttonWidth = Dimensions.get('window').width * 0.5;

  const playListId = props.route.params.playListId;
  const [playList, setPlayList] = useState<PlayListDetails | undefined>(undefined);
  const [spinner, setSpinner] = useState<boolean>(true);
  const [isFinishPressed, setIsFinishPressed] = useState<boolean>(false);

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

  const finish = async(): Promise<void> => {
    setIsFinishPressed(true);
    if (props.onFinish) {
      props.onFinish(playListId);
    } else {
      try {
        const instance = props.getProviderInstance();
        await props.createParty(playListId, instance);
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
      <Spinner visible={spinner} />

      {playList ?
        <PlayListDescription 
          styles={styles}
          playList={playList}
          onPress={finish}
          buttonWidth={buttonWidth}
          disabled={isFinishPressed}
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

const PlayListDescription = ({ styles, playList, onPress, buttonWidth, disabled }: iPlayListDescription) => (
  <View style={styles.playListDescriptionContainer}>
    <View style={styles.panel}>
      <Image
        source={{
          uri: playList.imageUri,
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
          size='sm'
          disabled={disabled}
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
          image={item.imageUri}
          title={item.title}
          description={`By: ${item.artists}`}
          key={item.trackUri}
        />
      )}
      keyExtractor={(item: Track) => item.trackUri}
    />
  </View>
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
    createParty: (playlistId: string, provider: any) => dispatch(createParty(playlistId, provider))
  }
};

export default connect(null, mapDispatchToProps)(withTheme(PreviewPlayListScreen));