import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './SelectProvider.style'
import { HOME_VIEWS } from '../../Utility/Constants'

export default SelectProvider = (props) => {

    function handleAuth() {
        props.navigate('SelectDefaultPlaylist')
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backContainer}
                activeOpacity={.5}
                onPress={() => props.changeView(HOME_VIEWS.HOME)}
            >
                <Text style={styles.text}>Back</Text>
            </TouchableOpacity>

            <View style={styles.paragraphContainer}>
                <Text style={styles.text}>You must connect one of the following services</Text>
            </View>

            <View style={styles.servicesContainer}>
                <TouchableOpacity
                    style={[styles.spotifyButton, styles.serviceButton]}
                    activeOpacity={.5}
                    onPress={handleAuth}
                >
                    <Image
                        source={require('../../assets/img/Spotify_Icon_RGB_White.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>Link Spotify</Text>
                    <Text></Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.appleMusicButton, styles.serviceButton]}
                    activeOpacity={.5}
                    onPress={() => props.navigate('SelectDefaultPlaylist')}
                >
                    <Image
                        source={require('../../assets/img/Apple_Music_Icon.png')}
                        style={styles.image}
                    />
                        <Text style={[styles.text]}>Link Apple Music</Text>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}