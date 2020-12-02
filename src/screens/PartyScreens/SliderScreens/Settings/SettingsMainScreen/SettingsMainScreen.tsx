import React from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import jsx from './SettingsMainScreen.style';
import ThemedButton, { MODE } from '../../../../../components/ThemedButton/ThemedButton';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { PlaylistDetails } from 'src/utility/MusicServices/MusicService';

interface SettingsMenuNavItemProps {
    title: string,
    icon: string,
    screenName: string,
    navigation: any,
    style?: any,
    disabled?: boolean
}

const SettingsMenuNavItem = (props: SettingsMenuNavItemProps) => {
    const {
        title,
        icon,
        screenName,
        navigation,
        style,
        disabled
    } = props;

    const onPress = () => {
        navigation.navigate(screenName);
    }

    return (
        <List.Item
            style={[
                style,
                disabled
                ? {
                    opacity: 0.5
                }
                : null
            ]}
            title={title}
            left={() => <List.Icon icon={icon} />}
            right={() => <List.Icon icon='chevron-right' />}
            onPress={onPress}
            disabled={disabled}
        />
    );
}

interface iSettingsPlaylistDetailsProps {
    data: PlaylistDetails,
    styles: any,
    navigation: any
}

const SettingsPlaylistDetailsItem = (props: iSettingsPlaylistDetailsProps) => {
    const {
        data,
        styles,
        navigation
    } = props;

    const onPress = () => {
        navigation.navigate('PreviewPlayList', {
            readOnly: true
        });
    }

    return (
        <List.Item
            title={data.title}
            description={data.description}
            descriptionNumberOfLines={3}
            descriptionEllipsizeMode='tail'
            left={() => (
                <Image
                    source={{
                        uri: data.imageUri
                    }}
                    style={styles.playlistImage}
                />
            )}
            right={() => (
                <List.Icon 
                    icon='chevron-right' 
                />
            )}
            onPress={onPress}
        />
    )
}

interface iSettingsMainScreenProps {
    navigation: any,
    theme: any,
    partyCreated: Date | null,
    playlistDetails: PlaylistDetails,
    username: string
}

const SettingsMainScreen = (props: iSettingsMainScreenProps) => {
    const {
        navigation,
        theme,
        partyCreated,
        playlistDetails,
        username
    } = props;

    const styles = jsx(theme);

    const isHost = username === '';

    return (
        <>
            <NavigationHeader
                navigation={navigation}
                isSlider={true}
                canGoBack={false}
                title='Party Settings'
            />
            <ScrollView>
                <List.Section>
                    <List.Subheader
                        style={styles.subheader}
                    >
                        Current Playlist
                    </List.Subheader>
                    { playlistDetails && <SettingsPlaylistDetailsItem
                        data={playlistDetails}
                        styles={styles}
                        navigation={navigation}
                    />}
                </List.Section>
                <List.Section>
                    <List.Subheader
                        style={styles.subheader}
                    >
                        Main Settings
                    </List.Subheader>
                    <SettingsMenuNavItem
                        title='Change Default Playlist'
                        icon='playlist-music'
                        screenName='DefaultPlaylist'
                        navigation={navigation}
                        style={styles.listItem}
                        disabled={!isHost}
                    />
                    <SettingsMenuNavItem
                        title='Song Requests'
                        icon='music-note-plus'
                        screenName='SongRequests'
                        navigation={navigation}
                        style={styles.listItem}
                    />
                    <List.Subheader
                        style={styles.footer}
                        numberOfLines={3}
                    >
                        Party Started on{' \n'}
                        {partyCreated?.toISOString()}
                    </List.Subheader>
                </List.Section>
                <List.Section>
                    {username === ''
                    ? (
                        <ThemedButton
                            mode={MODE.CONTAINED}
                            onPress={() => null}
                        >
                            END PARTY
                        </ThemedButton>
                    )
                    : (
                        <ThemedButton
                            mode={MODE.CONTAINED}
                            onPress={() => null}
                        >
                            LEAVE PARTY
                        </ThemedButton>
                    )}
                </List.Section>
            </ScrollView>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    partyCreated: state.partyReducer.created,
    playlistDetails: state.partyReducer.playlistDetails,
    username: state.userReducer.username,
});

export default connect(mapStateToProps, null)(SettingsMainScreen);