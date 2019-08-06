import React from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './SelectProvider.style'
import { ENTRANCE_VIEWS } from '../../Utility/Constants'
import { LinearTextGradient } from "react-native-text-gradient";


export default SelectProvider = (props) => {
    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                style={styles.backContainer}
                activeOpacity={.5}
                onPress={() => props.changeView(ENTRANCE_VIEWS.HOME)}
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
                    onPress={() => props.changeView(ENTRANCE_VIEWS.START)}
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
                    onPress={() => props.changeView(ENTRANCE_VIEWS.START)}
                >
                    <Image
                        source={require('../../assets/img/Apple_Music_Icon.png')}
                        style={styles.image}
                    />

                    <LinearTextGradient
                        style={styles.text}
                        locations={[0, 0.25, 0.5, 0.75, 1]}
                        colors={['#906cfe', '#CB5EBD', '#EA5870', '#CD70A2', '#51A1F6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={[styles.text]}>Link Spotify</Text>
                    </LinearTextGradient>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}