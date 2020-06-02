import React from 'react';

import SelectDefaultPlaylistScreen from '../../../../HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';

interface iSettingsSelectDefaultPlaylistScreenProps {
    navigation: any
}

const SettingsSelectDefaultPlaylistScreen = (props: iSettingsSelectDefaultPlaylistScreenProps) => {
    return (
        <>
            <NavigationHeader
                navigation={props.navigation}
                isSlider={true}
                title='Select a Playlist'
            />
            <SelectDefaultPlaylistScreen
                navigation={props.navigation}
                onBeforeBack={() => null}
                ignoreSafeArea
                noHeader
            />
        </>
    )
}

export default SettingsSelectDefaultPlaylistScreen;