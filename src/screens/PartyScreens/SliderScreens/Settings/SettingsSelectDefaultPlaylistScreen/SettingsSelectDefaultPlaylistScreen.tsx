import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';

import SelectDefaultPlaylistScreen from '../../../../HomeScreens/SelectDefaultPlaylistScreen/SelectDefaultPlaylistScreen';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
import { PlaylistDetails, Track } from 'src/utility/MusicServices/MusicService';
import { setPlaylistDetails, setPlaylistTracks, setPageNumber } from '../../../../../actions';


interface iSettingsSelectDefaultPlaylistScreenProps {
    navigation: any,
    playlistDetails: PlaylistDetails,
    playlistTracks: Track[],
    pageNumber: number,
    setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => void,
    setPlaylistTracks: (tracksToSet: Track[] | undefined) => void,
    setPageNumber: (pageNumber: number) => void,
}

const SettingsSelectDefaultPlaylistScreen = (props: iSettingsSelectDefaultPlaylistScreenProps) => {
    const [_playlistTracks, _setPlaylistTracks] = useState<Track[] | undefined>();
    const [_playlistDetails, _setPlaylistDetails] = useState<PlaylistDetails | undefined>();
    const [_pageNumber, _setPageNumber] = useState<number>(1);

    useEffect(() => {
        _setPlaylistTracks([...props.playlistTracks]);
        _setPlaylistDetails({...props.playlistDetails});
        _setPageNumber(props.pageNumber);
        props.setPlaylistTracks(undefined);
        props.setPlaylistDetails(undefined);
        props.setPageNumber(1);
    },[]);

    const onBeforeBack = () => {
        props.setPlaylistDetails(_playlistDetails);
        props.setPlaylistTracks(_playlistTracks);
        props.setPageNumber(_pageNumber);
    };

    return (
        <>
            <NavigationHeader
                navigation={props.navigation}
                isSlider={true}
                title='Select a Playlist'
                onBeforeBack={onBeforeBack}
            />
            <SelectDefaultPlaylistScreen
                ignoreSafeArea
                noHeader
                navigation={props.navigation}
                oldDefaultPlaylistId={_playlistDetails?.playlistId}
            />
        </>
    )
}

const mapStateToProps = (state: any) => ({
    playlistDetails: state.partyReducer.playlistDetails,
    playlistTracks: state.partyReducer.playlistTracks,
    pageNumber: state.partyReducer.pageNumber,
  });
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      setPlaylistTracks: (tracksToSet: Track[] | undefined) => dispatch(setPlaylistTracks(tracksToSet)),
      setPlaylistDetails: (playlistDetails: PlaylistDetails | undefined) => dispatch(setPlaylistDetails(playlistDetails)),
      setPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber)),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSelectDefaultPlaylistScreen);