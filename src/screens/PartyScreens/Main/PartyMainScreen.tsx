import React, {
  useState, useEffect
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
import { Track } from '../../../utility/MusicServices/MusicService';
import { getProviderInstance } from '../../../actions';
import ThemedButton, { MODE } from '../../../components/Button/ThemedButton';
import PartyViewSlider from '../../../components/PartyViewSlider/PartyViewSlider';
import SettingsNavigationContainer from '../SliderScreens/Settings/SettingsNavigationContainer';
import PartyMembersScreen from '../SliderScreens/PartyMembersScreen/PartyMembersScreen';
import SongRequestsScreen from '../SliderScreens/SongRequestsScreen/SongRequestsScreen';
import RequestASongScreen from '../SliderScreens/RequestASongScreen/RequestASongScreen';

interface PartyMainScreenProps {
  theme: any,
  partyId: string,
  username: string,
  getProviderInstance: () => any
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
  const [currentSong, setCurrentSong] = useState<Track | null>(null);
  const [previousSong, setPreviousSong] = useState<Track | null>(null);
  const [nextSong, setNextSong] = useState<Track | null>(null);

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
          style={styles.carouselImage}
          source={{ uri: item.item.image }}
        />
      </View>
    )

  useEffect(() => {
    const query = firestore()
      .collection(PARTIES_COLLECTION)
      .where('id', '==', props.partyId)
      .limit(1);
    const providerInstance = props.getProviderInstance();
    if (isPartyHost) {
      query
        .get()
        .then(
          async (documentSnapshot) => {
            const partyData = documentSnapshot.docs[0].data();
            if (partyData.previousSongId !== null) {
              setPreviousSong(
                await providerInstance.getTrack(partyData.previousSongId));
            }
            setCurrentSong(
              await providerInstance.getTrack(partyData.currentSongId));
            if (partyData.nextSongId !== null) {
              setNextSong(
                await providerInstance.getTrack(partyData.nextSongId));
            }
          }
        )
    } else {
      const subscriber = query
        .onSnapshot(
          async (documentSnapshot) => {
            const partyData = documentSnapshot.docs[0].data();
            setHostName(partyData.hostName);
            // setTimeElapsed(partyData.currentSongTimeElapsed);
            providerInstance.setToken(partyData.token);
            if (partyData.previousSongId !== null) {
              setPreviousSong(
                await providerInstance.getTrack(partyData.previousSongId));
            }
            setCurrentSong(
              await providerInstance.getTrack(partyData.currentSongId));
            if (partyData.nextSongId !== null) {
              setNextSong(
                await providerInstance.getTrack(partyData.nextSongId));
            }
          }
        )
      return () => subscriber();
    }
  }, []);

  let carouselTracks: Track[] = [];
  [previousSong, currentSong, nextSong].forEach(track => {
    if (track !== null) {
      carouselTracks.push(track);
    }
  });

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
        {currentSong !== null && (
          <>
            <Carousel
              data={carouselTracks}
              renderItem={renderTrackCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              scrollEnabled={true}
            />
            <View style={styles.songDetailsView}>
              <Text
                style={styles.songTitle}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {currentSong.title}
              </Text>
              <Text
                style={styles.songArtist}
              >
                By: {currentSong.artists}
              </Text>
              <View style={styles.songProgressView}>
                <View style={styles.edgeRow}>
                  <Text>0:00</Text>
                  <Text>{secondsToTime(currentSong.durationMs / 1000)}</Text>
                </View>
                <ProgressBar
                  style={styles.progressBar}
                  progress={0}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </PartyNavigationContainer>
  );
}

const mapStateToProps = (state: any) => ({
  partyId: state.partyReducer.id,
  username: state.userReducer.username
});

const mapDispatchToProps = (dispatch: Function) => ({
  getProviderInstance: () => dispatch(getProviderInstance()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTheme(PartyMainScreen)
);