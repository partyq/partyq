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
    setQueueByVoteCount: (queueByVoteCount: boolean) => void
}

const SettingsSongRequestsScreen = (props: iSettingsSongRequestsScreenProps) => {
    const {
        theme,
        requestsThreshold,
        setRequestThreshold,
        queueByVoteCount,
        setQueueByVoteCount
    } = props;

    const styles = jsx(theme);

    const useVotingThreshold = requestsThreshold !== null;

    const onUseRequestsThresholdChange = () => {
        if (useVotingThreshold) {
            setRequestThreshold(null);
        } else {
            setRequestThreshold(0);
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
                        title='Use Voting Threshold'
                        description='Enable this to set a number of votes that a request needs before it plays.'
                        right={() => (
                            <Switch
                                value={useVotingThreshold}
                                onValueChange={onUseRequestsThresholdChange}
                            />
                        )}
                    />
                    <View
                        style={
                            useVotingThreshold
                            ? null
                            : styles.disabled
                        }
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
                                />
                            )}
                        />
                    </View>
                </List.Section>
                <List.Section>
                    <List.Item
                        title='Queue Songs by Vote Count'
                        description='Enabling this will play the songs with the most votes first.'
                        right={() => (
                            <Switch
                                value={queueByVoteCount}
                                onValueChange={() => setQueueByVoteCount(!queueByVoteCount)}
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
    queueByVoteCount: state.partyReducer.queueByVoteCount
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