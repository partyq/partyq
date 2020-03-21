import React, {
    useState
} from 'react';
import {
    View,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import {
    Text,
    IconButton,
    ProgressBar,
    Button,
    withTheme
} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import jsx from './PartyMainScreen.style';

interface PartyMainScreenProps {
    theme: any
}

interface Track {
    imageUri: string
}

enum PartyOverlayType {
    Settings,
    PartyMembers,
    SongRequests,
    RequestASong
}

const TRACKS: Track[] = [
    {
        imageUri: 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg'
    },
    {
        imageUri: 'https://images.complex.com/complex/images/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/fg5nor5r1qpeoujsxqtc/post-malone-circles'
    },
    {
        imageUri: 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg'
    }
]

const IS_PARTY_HOST = true;

interface PartyOverlayProps {
    title: string,
    children: React.ReactElement
}

const TOP_SLIDER_HEIGHT = 130;
const BOTTOM_SLIDER_HEIGHT = 160;
const SLIDER_ANIMATION_DURATION = 500;

const PartyMainScreen = (props: PartyMainScreenProps) => {
    const [partyOverlayType, setPartyOverlayTypePage] = useState<PartyOverlayType | null>(null);
    const [topSliderHeight] = useState(new Animated.Value(TOP_SLIDER_HEIGHT));
    const [bottomSliderHeight] = useState(new Animated.Value(BOTTOM_SLIDER_HEIGHT));

    const styles = jsx(props.theme);

    const renderTrackCarouselItem = (item: {
        item: Track,
        index: number
    }) => (
        <View style={styles.carouselImageView}>
            <Image
                style={styles.carouselImage}
                source={{uri: item.item.imageUri}}
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

    const PartyOverlay = (props: PartyOverlayProps) => {
        return (
            <>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
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
                <></>
            </PartyOverlay>
        )
    }

    const PartyMembersOverlay = () => {
        return (
            <PartyOverlay
                title='Party Members'
            >
                <></>
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
                                <Text style={styles.partyId}>12345</Text>
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
                                <Text style={styles.pageTitle}>Your Party</Text>
                            </View>
                        </>
                    )}
                </Animated.View>
            )}
            {partyOverlayType == null && (
                <View style={styles.main}>
                    <Carousel
                        data={TRACKS}
                        renderItem={renderTrackCarouselItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={300}
                    />
                    <View style={styles.songDetailsView}>
                        <Text
                            style={styles.songTitle}
                        >
                            White Iverson
                        </Text>
                        <Text
                            style={styles.songArtist}
                        >
                            By: Post Malone
                        </Text>
                        <View style={styles.songProgressView}>
                            <View style={styles.edgeRow}>
                                <Text>2:20</Text>
                                <Text>5:00</Text>
                            </View>
                            <ProgressBar
                                style={styles.progressBar}
                                progress={0.3}
                            />
                        </View>
                    </View>
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
                                                onPress={() => null}
                                            />
                                            <IconButton 
                                                icon="play"
                                                color='white'
                                                style={styles.playButton}
                                                onPress={() => null}
                                            />
                                            <IconButton 
                                                icon="skip-next"
                                                onPress={() => null}
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

export default withTheme(PartyMainScreen);