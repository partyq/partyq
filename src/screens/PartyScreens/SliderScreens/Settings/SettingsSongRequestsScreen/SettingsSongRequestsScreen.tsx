import React from 'react';
import { TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, withTheme, Switch } from 'react-native-paper';

import jsx from './SettingsSongRequestsScreen.style';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';
import { connect } from 'react-redux';
import { setRequestThreshold, setQueueByVoteCount } from '../../../../../actions';

interface iSettingsSongRequestsScreenProps {
    navigation: any,
    theme: any,
    requestsThreshold: number | null,
    setRequestThreshold: (threshold: number | null) => void,
    queueByVoteCount: boolean,
    setQueueByVoteCount: (queueByVoteCount: boolean) => void,
    username: string
}

const SettingsSongRequestsScreen = (props: iSettingsSongRequestsScreenProps) => {
    const {
        theme,
        requestsThreshold,
        setRequestThreshold,
        queueByVoteCount,
        setQueueByVoteCount,
        username
    } = props;

    const styles = jsx(theme);

    const useVotingThreshold = requestsThreshold !== null;
    const isHost = username === '';

    const onUseRequestsThresholdChange = () => {
        if (useVotingThreshold) {
            setRequestThreshold(null);
        } else {
            setRequestThreshold(0);
        }
    }

    const onVoteNumberChange = (text: string) => {
        if (text === '') {
            setRequestThreshold(0);
        } else {
            setRequestThreshold(parseInt(text));
        }
    }

    return (
        <>
            <NavigationHeader
                navigation={props.navigation}
                isSlider={true}
                title='Song Requests'
            />
            <ScrollView>
                <List.Section>
                    <List.Item
                        style={[
                            !isHost
                            ? styles.disabled
                            : null
                        ]}
                        title='Use Voting Threshold'
                        description='Enable this to set a number of votes that a request needs before it plays.'
                        right={() => (
                            <Switch
                                value={useVotingThreshold}
                                onValueChange={onUseRequestsThresholdChange}
                                disabled={!isHost}
                            />
                        )}
                    />
                    <View
                        style={[
                            useVotingThreshold && isHost
                            ? null
                            : styles.disabled
                        ]}
                    >
                        <List.Item
                            title='Number of Votes'
                            right={() => (
                                <TextInput
                                    keyboardType='numeric'
                                    style={[
                                        styles.textField,
                                        styles.digitTextField
                                    ]}
                                    editable={isHost && useVotingThreshold}
                                    value={requestsThreshold?.toString()}
                                    onChangeText={onVoteNumberChange}
                                />
                            )}
                        />
                    </View>
                </List.Section>
                <List.Section>
                    <List.Item
                        style={[
                            !isHost
                            ? styles.disabled
                            : null
                        ]}
                        title='Queue Songs by Vote Count'
                        description='Enabling this will play the songs with the most votes first.'
                        right={() => (
                            <Switch
                                value={queueByVoteCount}
                                onValueChange={() => setQueueByVoteCount(!queueByVoteCount)}
                                disabled={!isHost}
                            />
                        )}
                    />
                </List.Section>
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    requestsThreshold: state.partyReducer.requestsThreshold,
    queueByVoteCount: state.partyReducer.queueByVoteCount,
    username: state.userReducer.username
});

const mapDispatchToProps = (dispatch: Function) => ({
    setRequestThreshold: (threshold: number | null) => dispatch(setRequestThreshold(threshold)),
    setQueueByVoteCount: (queueByVoteCount: boolean) => dispatch(setQueueByVoteCount(queueByVoteCount))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTheme(SettingsSongRequestsScreen)
);