import React from 'react'
import CardView from 'react-native-cardview'
import { View, Image } from 'react-native'
import styles from './Card.style'

export default Card = (props) => {

    return (
        <View style={styles.cardView}>
            <CardView
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
            >
                <Image
                    source={{
                        uri: props.uri
                    }}
                    style={styles.image}
                />

            </CardView>
        </View>
    )
}