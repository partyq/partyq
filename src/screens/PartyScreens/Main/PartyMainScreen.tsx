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
    Dimensions,
    Animated,
    ScrollView
} from 'react-native';
import {
    Text,
    IconButton,
    ProgressBar,
    Button,
    List,
    withTheme
} from 'react-native-paper';
import { 
    NavigationContainer
} from '@react-navigation/native';
import { 
    createStackNavigator 
} from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';

import jsx from './PartyMainScreen.style';
import { connect } from 'react-redux';
import { PARTIES_COLLECTION } from '../../../utility/backend';
import { Track } from '../../../utility/MusicServices/MusicService';
import { getProviderInstance } from '../../../actions';

interface PartyMainScreenProps {
    theme: any,
    partyId: string,
    username: string,
    getProviderInstance: () => any
}

enum PartyOverlayType {
    Settings,
    PartyMembers,
    SongRequests,
    RequestASong
}

interface PartyMember {
    name: string
}

const PARTY_MEMBERS: PartyMember[] = [
    {
        name: 'John'
    },
    {
        name: 'Joey'
    },
    {
        name: 'Chandler'
    },
    {
        name: 'Ross'
    },
    {
        name: 'Monica'
    },
    {
        name: 'Rachel'
    },
    {
        name: 'Pheobe'
    },
    {
        name: 'Leonard'
    },
    {
        name: 'Charlie'
    },
    {
        name: 'Sheldon'
    },
    {
        name: 'John'
    },
    {
        name: 'Joey'
    },
    {
        name: 'Chandler'
    },
    {
        name: 'Ross'
    },
    {
        name: 'Monica'
    },
    {
        name: 'Rachel'
    },
    {
        name: 'Pheobe'
    },
    {
        name: 'Leonard'
    },
    {
        name: 'Charlie'
    },
    {
        name: 'Sheldon'
    },
    {
        name: 'John'
    },
    {
        name: 'Joey'
    },
    {
        name: 'Chandler'
    },
    {
        name: 'Ross'
    },
    {
        name: 'Monica'
    },
    {
        name: 'Rachel'
    },
    {
        name: 'Pheobe'
    },
    {
        name: 'Leonard'
    },
    {
        name: 'Charlie'
    },
    {
        name: 'Sheldon'
    }
]

const SETTING_MENUS: iSettingsMenuItem[] = [
    {
        title: 'Default Playlist',
        icon: 'playlist-music',
        screenName: 'DefaultPlaylist'
    }
]

interface PartyOverlayProps {
    title: string,
    children: React.ReactElement[] | React.ReactElement
}

const TOP_SLIDER_HEIGHT = 130;
const BOTTOM_SLIDER_HEIGHT = 160;
const SLIDER_ANIMATION_DURATION = 500;

interface iSettingsMenuItem {
    title: string,
    icon: string,
    screenName: string
}

interface SettingsMenuItemProps {
    title: string,
    icon: string,
    onPress: () => null | null | undefined
}

interface SettingsScreenProps {
    navigation: any,
    theme: any
}

const SettingsMainScreen = (props: SettingsScreenProps) => {
    return (
        <ScrollView>
            <List.Section>
                {SETTING_MENUS.map((menu: iSettingsMenuItem, i: number) => (
                    <SettingsMenuItem
                        key={i}
                        title={menu.title}
                        icon={menu.icon}
                        onPress={() => props.navigation.navigate(menu.screenName)}
                    />
                ))}
            </List.Section>
            <List.Section>
                <Button
                    mode='contained'
                    onPress={() => null}
                >
                    <Text>End Party</Text>
                </Button>
            </List.Section>
        </ScrollView>
    );
}

const DefaultPlaylistScreen = () => {
    return <></>
}

const SettingsStack = createStackNavigator();

const SettingsNavigationContainer = () => {
    return (
        <NavigationContainer
            independent={true}
        >
            <SettingsStack.Navigator
                initialRouteName='Main'
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: 'white'
                    }
                }}
            >
                <SettingsStack.Screen 
                    name='Main' 
                    component={SettingsMainScreen} 
                />
                <SettingsStack.Screen 
                    name='DefaultPlaylist' 
                    component={DefaultPlaylistScreen} 
                />
            </SettingsStack.Navigator>
        </NavigationContainer>
    )
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
    return (
        <List.Item
            title={props.title}
            left={() => <List.Icon icon={props.icon} />}
            right={() => <List.Icon icon='chevron-right' />}
            onPress={props.onPress}
        />
    );
}

const PartyMainScreen = (props: PartyMainScreenProps) => {
    const [partyOverlayType, setPartyOverlayTypePage] = useState<PartyOverlayType | null>(null);
    const [topSliderHeight] = useState(new Animated.Value(TOP_SLIDER_HEIGHT));
    const [bottomSliderHeight] = useState(new Animated.Value(BOTTOM_SLIDER_HEIGHT));
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

    const IS_PARTY_HOST = props.username === '';

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
                source={{uri: item.item.image}}
            />
        </View>
    )

    const openOverlay = (type: PartyOverlayType) => {
        setPartyOverlayTypePage(type);
        let animatedValue;
        if (type === PartyOverlayType.Settings) {
            animatedValue = topSliderHeight;
        } else {
            animatedValue = bottomSliderHeight;
        }
        Animated.timing(
            animatedValue,
            {
                toValue: Dimensions.get('window').height * 0.95,
                duration: SLIDER_ANIMATION_DURATION
            }
        ).start();
    }

    const closeOverlay = () => {
        let animatedValue, toValue;
        if (partyOverlayType === PartyOverlayType.Settings) {
            animatedValue = topSliderHeight;
            toValue = TOP_SLIDER_HEIGHT;
        } else {
            animatedValue = bottomSliderHeight;
            toValue = BOTTOM_SLIDER_HEIGHT;
        }
        Animated.timing(
            animatedValue,
            {
                toValue: toValue,
                duration: SLIDER_ANIMATION_DURATION
            }
        ).start();
        setTimeout(() => {
            setPartyOverlayTypePage(null);
        }, SLIDER_ANIMATION_DURATION);
    }

    const onPlayerStateChanged = async (state: PlayerState) => {
        setPlayerState(state);
    }

    useEffect(() => {
        console.debug({
            currentSongId: `spotify:track:${currentSong?.id}`,
            playerStateId: playerState.track.uri,
        })

        if (currentSong && playerState.track.uri !== `spotify:track:${currentSong?.id}`) {
            console.warn('Lets pray')
            const providerInstance = props.getProviderInstance();
            providerInstance.pause();
        }
    }, [playerState])

    const onPlayPausePressed = () => {
        const providerInstance = props.getProviderInstance();
        if (playerState.isPaused) {
            providerInstance.resume();
        } else {
            providerInstance.pause();
        }
        const newPlayerState = {...playerState};
        newPlayerState.isPaused = !playerState.isPaused;
        setPlayerState(newPlayerState);
    }

    const onNextPressed = () => {
        const providerInstance = props.getProviderInstance();
        providerInstance.next();
    }

    const onPreviousPressed = () => {
        const providerInstance = props.getProviderInstance();
        providerInstance.previous();
    }

    useEffect(() => {
        const query = firestore()
            .collection(PARTIES_COLLECTION)
            .where('id', '==', props.partyId)
            .limit(1);
        const providerInstance = props.getProviderInstance();
        if (IS_PARTY_HOST) {
            providerInstance.registerCallbacks(
                {
                    onPlayerStateChanged
                }
            )
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

    const PartyOverlay = (props: PartyOverlayProps) => {
        return (
            <>
                <View style={styles.overlayView}>
                    <IconButton
                        icon='close'
                        onPress={closeOverlay}
                    />
                    <Text style={styles.pageTitle}>
                        {props.title}
                    </Text>
                    <IconButton
                        icon=''
                        onPress={() => null}
                        disabled
                    />
                </View>
                {props.children}
            </>
        )
    }

    const SettingsPartyOverlay = () => {
        return (
            <PartyOverlay
                title='Party Settings'
            >
                <SettingsNavigationContainer />
            </PartyOverlay>
        )
    }

    const PartyMembersOverlay = () => {
        return (
            <PartyOverlay
                title='Party Members'
            >
                <Text 
                    style={styles.partyMembersCount}
                >
                    Total Members: {PARTY_MEMBERS.length}
                </Text>
                <ScrollView>
                    <List.Section>
                        {PARTY_MEMBERS.map((member: PartyMember, i: number) => (
                            <List.Item
                                key={i}
                                title={member.name}
                            />
                        ))}
                    </List.Section>
                </ScrollView>
            </PartyOverlay>
        )
    }

    const RequestASongOverlay = () => {
        return (
            <PartyOverlay
                title='Request A Song'
            >
                <></>
            </PartyOverlay>
        )
    }

    const SongRequestsOverlay = () => {
        return (
            <PartyOverlay
                title='Song Requests'
            >
                <></>
            </PartyOverlay>
        )
    }

    let carouselTracks: Track[] = [];
    [previousSong, currentSong, nextSong].forEach(track => {
        if (track !== null) {
            carouselTracks.push(track);
        }
    });

    return (
        <>
            {partyOverlayType !== PartyOverlayType.PartyMembers && partyOverlayType !== PartyOverlayType.RequestASong && partyOverlayType !== PartyOverlayType.SongRequests && (
                <Animated.View 
                    style={[
                        styles.slider, 
                        styles.topSlider,
                        {
                            height: topSliderHeight
                        }
                    ]}
                >
                    {partyOverlayType === PartyOverlayType.Settings ? (
                        <SettingsPartyOverlay />
                    ) : (
                        <>
                            <View style={styles.edgeRow}>
                                <Text style={styles.partyId}>
                                    {props.partyId}
                                </Text>
                                {IS_PARTY_HOST ? (
                                    <IconButton 
                                        icon="settings"
                                        onPress={() => openOverlay(PartyOverlayType.Settings)}
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
                                    {IS_PARTY_HOST
                                        ? 'Your Party'
                                        : `${hostName}'s Party`}
                                </Text>
                            </View>
                        </>
                    )}
                </Animated.View>
            )}
            {partyOverlayType == null && (
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
            )}
            {partyOverlayType !== PartyOverlayType.Settings && (
                <Animated.View 
                    style={[
                        styles.slider, 
                        styles.bottomSlider,
                        {
                            height: bottomSliderHeight
                        }
                    ]}
                >
                    {partyOverlayType === PartyOverlayType.PartyMembers ? (
                        <PartyMembersOverlay />
                    ) : partyOverlayType === PartyOverlayType.RequestASong ? (
                        <RequestASongOverlay /> 
                    ) : partyOverlayType === PartyOverlayType.SongRequests ? (
                        <SongRequestsOverlay />
                    ) : (
                        <>
                            <View style={styles.centerRow}>
                                <View style={styles.musicControlsView}>
                                    {IS_PARTY_HOST ? (
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
                                            <Button
                                                mode='contained'
                                                onPress={() => openOverlay(PartyOverlayType.RequestASong)}
                                            >
                                                Request a song
                                            </Button>
                                        </>
                                    )}
                                </View>
                            </View>
                            <View style={styles.edgeRow}>
                                <IconButton 
                                    icon="account-group"
                                    onPress={() => openOverlay(PartyOverlayType.PartyMembers)}
                                />
                                <IconButton 
                                    icon="playlist-music"
                                    onPress={() => openOverlay(PartyOverlayType.SongRequests)}
                                />
                            </View>
                        </>
                    )}
                </Animated.View>
            )}
        </>
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