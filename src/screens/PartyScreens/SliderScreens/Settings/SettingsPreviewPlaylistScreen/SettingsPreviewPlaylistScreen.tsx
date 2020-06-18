import React from 'react';

import PreviewPlayListScreen from '../../../../HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';
import { getProviderInstance, } from '../../../../../actions';
import { changeDefaultPlayList } from '../../../../../actions/partyActions';
import { connect } from 'react-redux';
import { withSlider } from '../../../../../components/PartyViewSlider/PartyViewSlider';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
import { PlaylistDetails } from 'src/utility/MusicServices/MusicService';

interface iSettingsPreviewPlaylistScreenProps {
    navigation: any,
    route: any,
    onCloseSlider: () => void,
    getProviderInstance: () => any
    changeDefaultPlayList: (playlistDetails: PlaylistDetails) => Promise<void>
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
                onFinish={async (playlistDetails: PlaylistDetails) => {
                    await props.changeDefaultPlayList(playlistDetails);
                    props.onCloseSlider();
                }}
            />
        </>
    )
}

const mapDispatchToProps = (dispatch: Function) => ({
    getProviderInstance: () => dispatch(getProviderInstance()),
    changeDefaultPlayList: (playlistDetails: PlaylistDetails) => dispatch(changeDefaultPlayList(playlistDetails)),
});

export default connect(
    null,
    mapDispatchToProps
)(
    withSlider(SettingsPreviewPlaylistScreen)
);