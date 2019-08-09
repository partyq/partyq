import React from 'react'
import Wrapper from '../../hoc/Wrapper'
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Home.style'
import {HOME_VIEWS} from '../../Utility/Constants'

export default Home = (props) => {
    return (
        <Wrapper>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>PartyQ</Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={.5}
                    onPress={() => props.changeView(HOME_VIEWS.START)}
                >
                    <Text style={styles.buttonText}>Start a Party</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={.5}
                    onPress={() => props.changeView(HOME_VIEWS.ENTER_CODE)}
                >
                    <Text style={styles.buttonText}>Join a Party</Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
}
