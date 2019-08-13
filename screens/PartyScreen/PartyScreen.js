import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from './PartyScreen.style'
import theme from '../../assets/style/theme.style'
import { Icon } from 'react-native-elements';

export default class PartyScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={[theme.PRIMARY_DARK_COLOR, '#DC5681']} style={styles.linearGradientContainer}>
                    <TouchableOpacity
                        style={styles.playerContainer}
                    >
                        <View style={styles.playerHeader}>
                            <Text style={[styles.baseText, styles.playerRoomCode]}>12345</Text>
                            <Text style={[styles.baseText, styles.playerHeading]}>Currently Playing</Text>
                            <Icon name='settings' type='material' iconStyle={styles.settingsIcon} />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={styles.requestedSongContainer}>
                    <Text>Hello request</Text>
                </View>

                <View styles={styles.partyMembersContainer}>
                    <Text>Hello members</Text>
                </View>
            </View>
        );
    }
}