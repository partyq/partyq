import React from 'react'
import { Text, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';

import jsx from './Entrance.style'
import BackgroundContainer from '../../hoc/BackgroundContainer';
import {START_A_PARTY, JOIN_A_PARTY} from '../../config/RenderableData';

const  Entrance = (props) => {

    const styles = jsx(props.theme);

    const handleStartNewParty = () => props.navigation.navigate('Services');

    const handleJoinParty = () => props.navigation.navigate('Info');

    return (
        <BackgroundContainer>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PartyQ</Text>
            </View>

            <View style={styles.buttonContainer}>
                <LinearGradientButton onPress={handleStartNewParty} >{START_A_PARTY}</LinearGradientButton>
                <LinearGradientButton onPress={handleJoinParty} >{JOIN_A_PARTY}</LinearGradientButton>
            </View>
        </BackgroundContainer>
    );
}

export default withTheme(Entrance);