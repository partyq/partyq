import React from 'react';

import PreviewPlayListScreen from '../../../../HomeScreens/PreviewPlayListScreen/PreviewPlayListScreen';
import { getProviderInstance, } from '../../../../../actions';
import { setDefaultPlayList } from '../../../../../actions/partyActions';
import { connect } from 'react-redux';
import { withSlider } from '../../../../../components/PartyViewSlider/PartyViewSlider';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
// import { MusicService } from '../../../../../utility/MusicServices/MusicService';

interface iSettingsPreviewPlaylistScreenProps {
    navigation: any,
    route: any,
    onCloseSlider: () => void,
    getProviderInstance: () => any
    setDefaultPlayList: (playlistId: string, provider: string) => Promise<void>
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
                    await props.setDefaultPlayList(playlistId, instance)
                    props.onCloseSlider();
                }}
            />
        </>
    )
}

const mapDispatchToProps = (dispatch: Function) => ({
    getProviderInstance: () => dispatch(getProviderInstance()),
    setDefaultPlayList: (playlistId: string, provider: string) => dispatch(setDefaultPlayList(playlistId, provider)),
});

export default connect(
    null,
    mapDispatchToProps
)(
    withSlider(SettingsPreviewPlaylistScreen)
);