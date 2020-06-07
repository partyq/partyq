import React from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import jsx from './SettingsMainScreen.style';
import ThemedButton, { MODE } from '../../../../../components/Button/ThemedButton';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { PlaylistDetails } from 'src/utility/MusicServices/MusicService';

interface SettingsMenuNavItemProps {
    title: string,
    icon: string,
    screenName: string,
    navigation: any,
    style?: any
}

const SettingsMenuNavItem = (props: SettingsMenuNavItemProps) => {
    const {
        title,
        icon,
        screenName,
        navigation,
        style
    } = props;

    const onPress = () => {
        navigation.navigate(screenName);
    }

    return (
        <List.Item
            style={style}
            title={title}
            left={() => <List.Icon icon={icon} />}
            right={() => <List.Icon icon='chevron-right' />}
            onPress={onPress}
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
            playlistDetails: data
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
    isHost: boolean,
    partyCreated: Date | null,
    playlistDetails: PlaylistDetails
}

const SettingsMainScreen = (props: iSettingsMainScreenProps) => {
    const {
        navigation,
        theme,
        partyCreated,
        playlistDetails
    } = props;

    const styles = jsx(theme);

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
                    <SettingsPlaylistDetailsItem
                        data={playlistDetails}
                        styles={styles}
                        navigation={navigation}
                    />
                </List.Section>
                <List.Section>
                    <List.Subheader
                        style={styles.subheader}
                    >
                        Main Settings
                    </List.Subheader>
                    <SettingsMenuNavItem
                        title='Default Playlist'
                        icon='playlist-music'
                        screenName='DefaultPlaylist'
                        navigation={navigation}
                        style={styles.listItem}
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
                    <ThemedButton
                        mode={MODE.CONTAINED}
                        onPress={() => null}
                    >
                        END PARTY
                    </ThemedButton>
                </List.Section>
            </ScrollView>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    partyCreated: state.partyReducer.created,
    playlistDetails: state.partyReducer.playlistDetails
});

export default connect(
    mapStateToProps,
    null
)(
    SettingsMainScreen
);