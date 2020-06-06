import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  PlayerState,
  RepeatMode
} from 'react-native-spotify-remote';
import {
  View,
  Image,
  Dimensions
} from 'react-native';
import {
  Text,
  IconButton,
  ProgressBar,
  Button,
  withTheme
} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';

import jsx from './PartyMainScreen.style';
import {
  PARTIES_COLLECTION
} from '../../../utility/backend';
import { Track, PlaylistDetails } from '../../../utility/MusicServices/MusicService';
import { getProviderInstance, setPlaylistDetails } from '../../../actions';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import PartyViewSlider from '../../../components/PartyViewSlider/PartyViewSlider';
import SettingsNavigationContainer from '../SliderScreens/Settings/SettingsNavigationContainer';
import PartyMembersScreen from '../SliderScreens/PartyMembersScreen/PartyMembersScreen';
import SongRequestsScreen from '../SliderScreens/SongRequestsScreen/SongRequestsScreen';
import RequestASongScreen from '../SliderScreens/RequestASongScreen/RequestASongScreen';
import useInterval from '../../../utility/useInterval';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';

interface PartyMainScreenProps {
  theme: any,
  partyId: string,
  username: string,
  getProviderInstance: () => any,
  setPlaylistDetails: (playlistDetails: PlaylistDetails) => void,
  playlistDetails: PlaylistDetails,
}

interface iTopSliderProps {
  partyId: string,
  isPartyHost: boolean,
  hostName: string,
  styles: any,
  hidden: boolean,
  onOverlayChange?: (overlay: React.ReactElement | null) => void
}

const TopSlider = (props: iTopSliderProps) => {
  const {
    partyId,
    isPartyHost,
    hostName,
    styles,
    hidden,
    onOverlayChange
  } = props;

  const [overlay, setOverlay] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    if (onOverlayChange) {
      onOverlayChange(overlay);
    }
  }, [overlay]);

  return (
    <PartyViewSlider
      open={overlay !== null}
      onClose={() => setOverlay(null)}
      side='top'
      hidden={hidden}
    >
      {overlay ? (
        overlay
      ) : (
          <>
            <View style={styles.edgeRow}>
              <Text style={styles.partyId}>
                {partyId}
              </Text>
              {isPartyHost ? (
                <IconButton
                  icon="settings"
                  onPress={() => setOverlay(
                    <SettingsNavigationContainer />
                  )}
                />
              ) : (
                  <Button
                    onPress={() => null}
                  >
                    <Text style={styles.leaveText}>
                      Leave
                    </Text>
                  </Button>
                )}
            </View>
            <View style={styles.centerRow}>
              <Text style={styles.pageTitle}>
                {isPartyHost
                  ? 'Your Party'
                  : `${hostName}'s Party`}
              </Text>
            </View>
          </>
        )}
    </PartyViewSlider>
  )
}

interface iBottomSliderProps {
  styles: any,
  playerState: any,
  setPlayerState: (state: any) => void,
  isPartyHost: boolean,
  getProviderInstance: () => any,
  hidden: boolean,
  onOverlayChange?: (overlay: React.ReactElement | null) => void
}

const BottomSlider = (props: iBottomSliderProps) => {
  const {
    styles,
    playerState,
    isPartyHost,
    getProviderInstance,
    setPlayerState,
    hidden,
    onOverlayChange
  } = props;

  const [overlay, setOverlay] = useState<React.ReactElement | null>(null);

  const onPlayPausePressed = () => {
    const providerInstance = getProviderInstance();
    if (playerState.isPaused) {
      providerInstance.resume();
    } else {
      providerInstance.pause();
    }
    const newPlayerState = { ...playerState };
    newPlayerState.isPaused = !playerState.isPaused;
    setPlayerState(newPlayerState);
  }

  const onNextPressed = () => {
    const providerInstance = getProviderInstance();
    providerInstance.next();
  }

  const onPreviousPressed = () => {
    const providerInstance = getProviderInstance();
    providerInstance.previous();
  }

  useEffect(() => {
    if (onOverlayChange) {
      onOverlayChange(overlay);
    }
  }, [overlay]);

  return (
    <PartyViewSlider
      open={overlay !== null}
      onClose={() => setOverlay(null)}
      side='bottom'
      hidden={hidden}
    >
      {overlay ? (
        overlay
      ) : (
        <>
          <View style={styles.centerRow}>
            <View style={styles.musicControlsView}>
              {isPartyHost ? (
                <>
                  <IconButton
                    icon="skip-previous"
                    onPress={onPreviousPressed}
                  />
                  <IconButton
                    icon={playerState.isPaused ? 'play' : 'pause'}
                    color='white'
                    style={styles.playButton}
                    onPress={onPlayPausePressed}
                  />
                  <IconButton
                    icon="skip-next"
                    onPress={onNextPressed}
                  />
                </>
              ) : (
                  <>
                    <ThemedButton
                      mode={MODE.CONTAINED}
                      onPress={() => setOverlay(
                        <RequestASongScreen />
                      )}
                    >
                      REQUEST A SONG
                    </ThemedButton>
                  </>
                )}
            </View>
          </View>
          <View style={styles.edgeRow}>
            <IconButton
              icon="account-group"
              onPress={() => setOverlay(
                <PartyMembersScreen />
              )}
            />
            <IconButton
              icon="playlist-music"
              onPress={() => setOverlay(
                <SongRequestsScreen />
              )}
            />
          </View>
        </>
      )}
    </PartyViewSlider>
  )
}

interface iPartyNavigationContainerProps {
  children: React.ReactElement[] | React.ReactElement,
  partyId: string,
  isPartyHost: boolean,
  hostName: string,
  styles: any,
  playerState: any,
  setPlayerState: (state: any) => void,
  getProviderInstance: () => any
}

const PartyNavigationContainer = (props: iPartyNavigationContainerProps) => {
  const {
    partyId,
    isPartyHost,
    hostName,
    styles,
    children,
    playerState,
    setPlayerState,
    getProviderInstance
  } = props;

  const [openSlider, setOpenSlider] = useState<'top' | 'bottom' | null>(null);

  const onTopOverlayChanged = (overlay: React.ReactElement | null) => {
    if (overlay === null) {
      setOpenSlider(null);
    } else {
      setOpenSlider('top');
    }
  }

  const onBottomOverlayChanged = (overlay: React.ReactElement | null) => {
    if (overlay === null) {
      setOpenSlider(null);
    } else {
      setOpenSlider('bottom');
    }
  }

  return (
    <>
      <TopSlider
        partyId={partyId}
        isPartyHost={isPartyHost}
        hostName={hostName}
        styles={styles}
        hidden={openSlider === 'bottom'}
        onOverlayChange={onTopOverlayChanged}
      />
      {children}
      <BottomSlider
        styles={styles}
        playerState={playerState}
        setPlayerState={setPlayerState}
        isPartyHost={isPartyHost}
        getProviderInstance={getProviderInstance}
        hidden={openSlider === 'top'}
        onOverlayChange={onBottomOverlayChanged}
      />
    </>
  )
}

const PartyMainScreen = (props: PartyMainScreenProps) => {
  let carouselRef = useRef();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPaused: false,
    playbackOptions: {
      isShuffling: false,
      repeatMode: RepeatMode.Context
    },
    playbackSpeed: 0,
    playbackPosition: 0,
    playbackRestrictions: {
      canSeek: true,
      canRepeatContext: true,
      canRepeatTrack: true,
      canSkipNext: true,
      canSkipPrevious: true,
      canToggleShuffle: true
    },
    track: {
      duration: 0,
      uri: "",
      album: {
        name: "",
        uri: ""
      },
      saved: false,
      episode: false,
      podcast: false,
      name: "",
      artist: {
        name: "",
        uri: ""
      }
    }
  });

  const [hostName, setHostName] = useState('');
  const [currentPlayingTrackIndex, setCurrentPlayingTrackIndex] = useState<number>(0);
  const [currentTrackInView, setCurrentTrackInView] = useState<number>(0);
  const [previousSong, setPreviousSong] = useState<Track | null>(null);
  const [nextSong, setNextSong] = useState<Track | null>(null);
  const [isReadyToQueue, setIsReadyToQueue] = useState<Boolean>(false);
  const [tracks, setTracks] = useState<Track[]>();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const styles = jsx(props.theme);

  const isPartyHost = props.username === '';

  const secondsToTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds & 60;
    const _seconds = `0${remainder}`.slice(-2);
    return `${minutes}:${_seconds}`;
  }

  const renderTrackCarouselItem = (item: {
    item: Track,
    index: number
  }) => (
      <View style={styles.carouselImageView}>
        <Image
          style={[
            styles.carouselImage,
            item.index === currentPlayingTrackIndex && styles.carouselImageActive,
          ]}
          source={{ uri: item.item.imageUri }}
        />
      </View>
    );

  useEffect(() => {

    if (props.playlistDetails) {
      getTracks(pageNumber);
    }

  }, [props.playlistDetails]);

  useEffect(() => {
    console.log(tracks)
  }, [tracks]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };
  
  const onBeforeSnapToTrack = (index: number) => {
    setCurrentTrackInView(index);
  };

  const getTracks = async (pageNumber: number): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data: Track[] = await instance.getTracks(props.playlistDetails.playlistId, pageNumber);

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

  useEffect(() => {
    const providerInstance = props.getProviderInstance();

    const query = firestore()
      .collection(PARTIES_COLLECTION)
      .where('id', '==', props.partyId)
      .limit(1);
    if (isPartyHost) {
      query
        .get()
        .then(
          async (documentSnapshot) => {
            const partyData = documentSnapshot.docs[0].data();
          }
        )

    } else {
      const subscriber = query
        .onSnapshot(
          async (documentSnapshot) => {
            const partyData = documentSnapshot.docs[0].data();
            setHostName(partyData.hostName);
            setCurrentPlayingTrackIndex(partyData.currentPlayingTrackIndex)
            props.setPlaylistDetails(partyData.playlistDetails);

            providerInstance.setToken(partyData.token);
          }
        )
      return () => subscriber()
    }
  }, []);

  useInterval(async() => {
    const providerInstance = props.getProviderInstance();
    const playerState = await providerInstance.getPlayerState();
    const crossfadeState = await providerInstance.getCrossfadeState();
    const crossfadeDuration = crossfadeState.enabled ? crossfadeState.duration : 0;
    const durationLeft = Math.floor((playerState.track.duration - playerState.playbackPosition)/1000)*1000;

    // if within safe duration, queue next song
    if (durationLeft <= (crossfadeDuration + 5000) && !isReadyToQueue) {
      setIsReadyToQueue(true);
    }
    // don't queue next song if current song still has plenty of time to play
    else if (durationLeft > (crossfadeDuration + 5000) && isReadyToQueue) {
      setIsReadyToQueue(false);
    }
  }, 2000)

  useEffect(() => {
    if (isReadyToQueue) {
      const providerInstance = props.getProviderInstance();
      providerInstance.queueTrack(nextSong?.trackUri);
    }
  }, [isReadyToQueue]);

  return (
    <PartyNavigationContainer
      partyId={props.partyId}
      isPartyHost={isPartyHost}
      hostName={hostName}
      styles={styles}
      playerState={playerState}
      setPlayerState={setPlayerState}
      getProviderInstance={props.getProviderInstance}
    >
      <View style={styles.main}>
        {tracks !== undefined && (
          <>
            <Carousel
              ref={(ref: any) => carouselRef = ref}
              data={tracks}
              renderItem={renderTrackCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              lockScrollWhileSnapping={true}
              snapToAlignment={'center'}
              swipeThreshold={20}
              onBeforeSnapToItem={(index) => onBeforeSnapToTrack(index)}
              // ListFooterComponent={props.playlistDetails.totalTracks !== tracks?.length ? <LoadingIndicator/> : null}
              // onEndReached={() => props.playlistDetails.totalTracks !== tracks?.length ? handleLoadMore() : null}
              // onEndReachedThreshold={0}
            />
            <View style={styles.songDetailsView}>
              <Text
                style={styles.songTitle}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {tracks[currentTrackInView].title}
              </Text>
              <Text
                style={styles.songArtist}
              >
                By: {tracks[currentTrackInView].artists}
              </Text>
              {
                currentTrackInView === currentPlayingTrackIndex &&
                  <View style={styles.songProgressView}>
                  <View style={styles.edgeRow}>
                    <Text>0:00</Text>
                    <Text>{secondsToTime(tracks[currentTrackInView].durationMs / 1000)}</Text>
                  </View>
                  <ProgressBar
                    style={styles.progressBar}
                    progress={0}
                  />
                </View>
              }
            </View>
          </>
        )}
      </View>
    </PartyNavigationContainer>
  );
}

const mapStateToProps = (state: any) => ({
  partyId: state.partyReducer.partyId,
  username: state.userReducer.username,
  playlistDetails: state.partyReducer.playlistDetails
});

const mapDispatchToProps = (dispatch: Function) => ({
  getProviderInstance: () => dispatch(getProviderInstance()),
  setPlaylistDetails: (playlistDetails: PlaylistDetails) => dispatch(setPlaylistDetails(playlistDetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTheme(PartyMainScreen)
);