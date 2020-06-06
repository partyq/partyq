import React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './PartyMembersScreen.style';
import { PartyMember } from '../../../../utility/backend';
import NavigationHeader from '../../../../components/NavigationHeader/NavigationHeader';

interface iPartyMembersScreenProps {
    theme: any,
    members: PartyMember[]
}

const PartyMembersScreen = (props: iPartyMembersScreenProps) => {
    const {
        theme,
        members
    } = props;

    const styles = jsx(theme);

    return (
        <>
            <NavigationHeader
                title='Party Members'
                isSlider={true}
            />
            <Text
                style={styles.count}
            >
                Total Members: {members.length}
            </Text>
            <ScrollView>
                <List.Section>
                    {members.map((member: PartyMember, i: number) => (
                        <List.Item
                            key={i}
                            title={member.name}
                        />
                    ))}
                </List.Section>
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    members: state.partyReducer.members
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(PartyMembersScreen)
);

