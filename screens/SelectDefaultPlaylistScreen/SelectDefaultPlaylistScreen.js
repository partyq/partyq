import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from './SelectDefaultPlaylistScreen.style'
import { SearchBar } from 'react-native-elements'

export default SelectDefaultPlaylistScreen = (props) => {
    const [playListToSearch, setPlayListToSearch] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Text>Select a Playlist</Text>
                <SearchBar
                    placeHolder="Search for a playlist..."
                    round={true}
                    lightTheme={true}
                    placeHolderTextColor={styles.placeHolderTextColor}
                    onChangeText={(playListToSearch) => setPlayListToSearch(playListToSearch)}
                    value={playListToSearch}
                    containerStyle={styles.searchBar}
                />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={[
                        { key: 'Devin' },
                        { key: 'Dan' },
                        { key: 'Dominic' },
                        { key: 'Jackson' },
                        { key: 'James' },
                        { key: 'Joel' },
                        { key: 'John' },
                        { key: 'Jillian' },
                        { key: 'Jimmy' },
                        { key: 'Julie' },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
        </View>
    )
}