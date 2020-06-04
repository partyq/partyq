import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './SongRequestsScreen.style';
import NavigationHeader from '../../../../components/NavigationHeader/NavigationHeader';
import { SongRequest, songRequestsListener, votesListener, SongVote } from '../../../../utility/backend';
import SongRequestItem from '../../../../components/SongRequestItem/SongRequestItem';

interface iSongRequestsScreenProps {
    theme: any,
    partyId: string
}

const SongRequestsScreen = (props: iSongRequestsScreenProps) => {
    const {
        theme,
        partyId
    } = props;

    const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
    const [songVotes, setSongVotes] = useState<SongVote[]>([]);

    const styles = jsx(theme);

    let upvotes: { [key: string]: number } = {};
    let downvotes: { [key: string]: number } = {};
    songVotes.forEach(vote => {
        if (vote.value === 1) {
            if (!(vote.songId in upvotes)) {
                upvotes[vote.songId] = 1;
            } else {
                upvotes[vote.songId] += 1;
            }
        } else {
            if (!(vote.songId in downvotes)) {
                downvotes[vote.songId] = 1;
            } else {
                downvotes[vote.songId] += 1;
            }
        }
    });

    const getScore = (songRequest: SongRequest): number => {
        let score = 0;
        if (songRequest.songId in upvotes) {
            score += upvotes[songRequest.songId];
        }
        if (songRequest.songId in downvotes) {
            score -= downvotes[songRequest.songId];
        }
        return score;
    }

    const compareSongRequests = (a: SongRequest, b: SongRequest): number => {
        return getScore(a) - getScore(b);
    }

    useEffect(() => {
        return songRequestsListener(partyId,
            (requests: SongRequest[]) => {
                setSongRequests(requests);
            })
    }, []);

    useEffect(() => {
        return votesListener(partyId,
            (votes: SongVote[]) => {
                setSongVotes(votes);
            })
    }, []);

    const _songRequests = [...songRequests];
    // _songRequests.sort(compareSongRequests);

    return (
        <>
            <NavigationHeader
                isSlider={true}
                canGoBack={false}
                title='Song Requests'
            />
            <Text
                style={styles.count}
            >
                Songs Requested: {songRequests.length}
            </Text>
            <ScrollView>
                <List.Section>
                    {_songRequests.map((request: SongRequest, i: number) => (
                        <SongRequestItem
                            key={i}
                            songId={request.songId}
                            upvotes={upvotes[request.songId] | 0}
                            downvotes={downvotes[request.songId] | 0}
                            requester={request.requester}
                        />
                    ))}
                </List.Section>
            </ScrollView>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    partyId: state.partyReducer.partyId
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(SongRequestsScreen)
);