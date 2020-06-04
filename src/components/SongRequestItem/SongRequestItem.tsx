import React, {
    useEffect,
    useState
} from 'react';

import {
    Track
} from '../../utility/MusicServices/MusicService';
import { getProviderInstance } from '../../actions';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import PlayListItem from '../PlayListItem/PlayListItem';

import {
    View
} from 'react-native';
import jsx from './SongRequestItem.style';
import { withTheme, Text } from 'react-native-paper';
import { voteOnSong } from '../../utility/backend';

interface SongRequestItemProps {
    songId: string,
    upvotes: number,
    downvotes: number,
    requester: string,
    getProviderInstance: () => any,
    theme: any,
    partyId: string,
    username: string
}

const SongRequestItem = (props: SongRequestItemProps) => {
    const [song, setSong] = useState<Track | null>(null);

    const styles = jsx(props.theme);

    useEffect(() => {
        const providerInstance = props.getProviderInstance();
        providerInstance.getTrack(props.songId)
            .then(
                (track: Track) => {
                    setSong(track)
                }
            )
    }, []);

    const _upvoteSong = () => {
        voteOnSong(
            props.partyId,
            props.songId,
            props.username,
            1
        );
    }

    const _downvoteSong = () => {
        voteOnSong(
            props.partyId,
            props.songId,
            props.username,
            -1
        );
    }
    
    if (song === null) {
        return <></>;
    }

    return (
        <PlayListItem
            title={song.title}
            image={song.imageUri}
            description={`By: ${song.artists}`}
            right={() => (
                <View style={styles.votesContainer}>
                    <Icon
                        name='thumb-up'
                        type='MaterialCommunityIcons'
                        onPress={_upvoteSong}
                        color='#49c46a'
                        // size=
                    />
                    <Text style={styles.count}>
                        {props.upvotes}
                    </Text>
                    <Icon
                        name='thumb-down'
                        type='MaterialCommunityIcons'
                        onPress={_downvoteSong}
                        color='#c44949'
                        // size=
                    />
                    <Text style={styles.count}>
                        {props.downvotes}
                    </Text>
                </View>
            )}
        />
    )
}

const mapStateToProps = (state: any) => ({
    partyId: state.partyReducer.partyId,
    username: state.userReducer.username
});

const mapDispatchToProps = (dispatch: Function) => ({
    getProviderInstance: () => dispatch(getProviderInstance())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTheme(SongRequestItem)
);

