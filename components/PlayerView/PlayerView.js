import React from 'react'
import styles from './PlayerView.style'
import { View, FlatList } from 'react-native'
import Card from '../Card/Card'
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native'

export default PlayerView = (props) => {

    const screenWidth = Math.round(Dimensions.get('window').width);
    const imgDim = screenWidth * 0.7;

    return (
        <View styles={styles.listContainer}>
            <FlatList

                horizontal
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>
                    <Card uri={item.image} key={index} />}
                keyExtractor={(item, index) => index}
            />

            <Carousel
                layout={'default'}
                data={[
                    {
                        image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                        title: 'Sommarhits 2019',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                        title: 'Det svenska NollNolltalet',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                        title: 'Liiit',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                        title: 'Sommarhits 2019',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                        title: 'Det svenska NollNolltalet',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                        title: 'Liiit',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                        title: 'Sommarhits 2019',
                    },
                    {
                        image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                        title: 'Det svenska NollNolltalet',
                    }
                ]}
                renderItem={({ item, index }) => <Card uri={item.image} key={index} />}
                sliderWidth={screenWidth}
                itemWidth={imgDim}
                itemHeight={imgDim}
            />

        </View>
    )
}