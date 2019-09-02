import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './SelectDefaultPlaylistScreen.style';
import { SearchBar } from 'react-native-elements';
import PlayListItem from '../../components/PlayListItem/PlayListItem';

export default SelectDefaultPlaylistScreen = (props) => {
    const [playListToSearch, setPlayListToSearch] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Text style={styles.headingText}>Select a Playlist</Text>
                <SearchBar
                    placeHolder="Search for a playlist..."
                    round={true}
                    lightTheme={true}
                    placeHolderTextColor={styles.placeHolderTextColor}
                    onChangeText={(playListToSearch) => setPlayListToSearch(playListToSearch)}
                    value={playListToSearch}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={[
                        {
                            image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                            title: 'Sommarhits 2019',
                            description: '87'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                            title: 'Det svenska NollNolltalet',
                            description: '50'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                            title: 'Liiit',
                            description: '95'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                            title: 'Sommarhits 2019',
                            description: '87'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                            title: 'Det svenska NollNolltalet',
                            description: '50'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                            title: 'Liiit',
                            description: '95'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                            title: 'Sommarhits 2019',
                            description: '87'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                            title: 'Det svenska NollNolltalet',
                            description: '50'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                            title: 'Liiit',
                            description: '95'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/f4ac4cbdcfdfbab7626e26bbd636b30316a51bea',
                            title: 'Sommarhits 2019',
                            description: '87'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/48c6e95fc874b29f6ede109928bcb35ac7168139',
                            title: 'Det svenska NollNolltalet',
                            description: '50'
                        },
                        {
                            image: 'https://pl.scdn.co/images/pl/default/4b76c7fbb446c5cd5e9aab2afc4055fb213fdcee',
                            title: 'Liiit',
                            description: '95'
                        }
                    ]}
                    renderItem={({ item, index }) => <PlayListItem image={item.image} title={item.title} description={item.description} key={index} navigate={props.navigation.navigate}/>}
                    keyExtractor={(item, index) => index}

                />
            </View>
        </View>
    )
}