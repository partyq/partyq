import React from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

import Wrapper from '../../hoc/Wrapper';
import styles from './WelcomeScreen.style';

class WelcomeScreen extends React.Component {

    componentDidMount = () => {
        setTimeout(this.handleChangeScreen, 1000);
    }

    handleChangeScreen = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        alert(JSON.stringify(this.props.theme));
        return (
            <Wrapper>
                <View style={styles.view}>
                    <Text style={styles.text}>Q</Text>
                </View>
            </Wrapper>
        );
    }
}

export default withTheme(WelcomeScreen);