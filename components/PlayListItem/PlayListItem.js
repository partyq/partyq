import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './PlayListItem.style'

export default PlayListItem = (props) => {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={.5}
            onPress={() => props.navigate('Party')}
        >
            <Image
                source={{
                    uri: props.image
                }}
                style={styles.image}
            />

            <View style={styles.descriptionContainer} >
                <Text style={styles.title} >{props.title}</Text>
                <Text style={styles.description} >{props.description}</Text>
            </View>
        </TouchableOpacity>
    );
}