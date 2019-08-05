import React from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TouchableOpacity } from 'react-native';

class Entrance extends React.Component {

    render() {
        return (
            <ImageBackground
                source={require('../../assets/initial_wallpaper.gif')}
                style={{ width: '100%', height: '100%' }}
            >

                <Text style={{ color: 'white', fontSize: 40, fontWeight: '700', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>PartyQ</Text>



                    <TouchableOpacity
                        style={styles.StartButtonStyle}
                        activeOpacity={.5}
                        onPress={this.ButtonClickCheckFunction}
                    >

                        <Text style={styles.TextStyle}> Start a party </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.JoinButtonStyle}
                        activeOpacity={.5}
                        onPress={this.ButtonClickCheckFunction}
                    >

                        <Text style={styles.TextStyle}> Start a party </Text>

                    </TouchableOpacity>


            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    StartButtonStyle: {
        marginTop: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 25
    },
    JoinButtonStyle: {
        marginTop: 35,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 25
    },

    TextStyle: {
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }

});

export default Entrance;