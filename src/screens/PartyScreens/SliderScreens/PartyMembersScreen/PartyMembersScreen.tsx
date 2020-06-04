import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './PartyMembersScreen.style';
import { PartyMember, partyMembersListener } from '../../../../utility/backend';
import NavigationHeader from '../../../../components/NavigationHeader/NavigationHeader';

interface iPartyMembersScreenProps {
    theme: any,
    partyId: string
}

const PartyMembersScreen = (props: iPartyMembersScreenProps) => {
    const {
        theme,
        partyId
    } = props;

    const [partyMembers, setPartyMembers] = useState<PartyMember[]>([]);

    const styles = jsx(theme);

    useEffect(() => {
        return partyMembersListener(partyId,
            (members: PartyMember[]) => {
                setPartyMembers(members);
            })
    }, []);

    return (
        <>
            <NavigationHeader
                title='Party Members'
                isSlider={true}
            />
            <Text
                style={styles.count}
            >
                Total Members: {partyMembers.length}
            </Text>
            <ScrollView>
                <List.Section>
                    {partyMembers.map((member: PartyMember, i: number) => (
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
    partyId: state.partyReducer.partyId
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(PartyMembersScreen)
);

