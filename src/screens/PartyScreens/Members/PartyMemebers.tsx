import React from 'react';
import {
  ScrollView
} from 'react-native';
import {
  withTheme,
  List,
  Text,
} from 'react-native-paper';

import jsx from './PartyMembers.style';
import PartyOverlay from '../Overlay/PartyOverlay';

export interface iMember {
  name: string,
}

export interface iPartyMembers {
  theme: any,
  partyMembers: iMember[],
}

const PartyMembers = (props: iPartyMembers) => {
  const styles = jsx(props.theme);
  
  return (
    <PartyOverlay
      title='Party Members'
    >
      <Text
        style={styles.partyMembersCount}
      >
        Total Members: {props.partyMembers.length}
      </Text>
      <ScrollView>
        <List.Section>
          {props.partyMembers.map((member: iMember, i: number) => (
            <List.Item
              key={i}
              title={member.name}
            />
          ))}
        </List.Section>
      </ScrollView>
    </PartyOverlay>
  )
}

export default withTheme(PartyMembers);