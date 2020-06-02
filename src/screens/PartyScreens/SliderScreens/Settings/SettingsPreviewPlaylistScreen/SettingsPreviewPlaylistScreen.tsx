import React from 'react';

import PreviewPlayListScreen from '../../../../HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';
import { getProviderInstance } from '../../../../../actions';
import { connect } from 'react-redux';
import { withSlider } from '../../../../../components/PartyViewSlider/PartyViewSlider';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
// import { MusicService } from '../../../../../utility/MusicServices/MusicService';

interface iSettingsPreviewPlaylistScreenProps {
    navigation: any,
    route: any,
    onCloseSlider: () => void,
    getProviderInstance: () => any
}

const SettingsPreviewPlaylistScreen = (props: iSettingsPreviewPlaylistScreenProps) => {
    return (
        <>
            <NavigationHeader
                navigation={props.navigation}
                isSlider={true}
                title='Preview PlayList'
            />
            <PreviewPlayListScreen
                navigation={props.navigation}
                route={props.route}
                ignoreSafeArea
                noHeader
                onFinish={async (playlistId: string) => {
                    const instance = props.getProviderInstance();
                    const playlist = await instance.getPlayList(playlistId);
                    if (playlist.tracks.length > 0) {
                        // TODO: Actually set playlist to playing
                        props.onCloseSlider();
                    }
                }}
            />
        </>
    )
}

const mapDispatchToProps = (dispatch: Function) => ({
    getProviderInstance: () => dispatch(getProviderInstance())
});

export default connect(
    null,
    mapDispatchToProps
)(
    withSlider(SettingsPreviewPlaylistScreen)
);