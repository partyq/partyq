import React from 'react'
import Wrapper from '../../hoc/Wrapper'
import { View, Text } from 'react-native'
import styles from './WelcomeScreen.style'

export default class WelcomeScreen extends React.Component {

    componentDidMount = () => {
        setTimeout(this.handleChangeScreen, 1000);
    }

    handleChangeScreen = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Wrapper>
                <View style={styles.view}>
                    <Text style={styles.text}>Q</Text>
                </View>
            </Wrapper>
        );
    }
}