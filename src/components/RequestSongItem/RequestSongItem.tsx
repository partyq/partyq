import React from 'react';
import { List, Divider, withTheme, Button } from 'react-native-paper';
import { Image, View } from 'react-native';
import { Icon } from 'react-native-elements';

import jsx from './RequestSongItem.style';
import ThemedButton, { MODE } from '../Button/ThemedButton';

interface iRequestSongItemProps {
    id: string,
    title: string,
    artist: string,
    imageUri?: string,
    requested: boolean,
    onRequest: (id: string) => void,
    theme: any
}

const RequestSongItem = (props: iRequestSongItemProps) => {
    const {
        id,
        title,
        artist,
        imageUri,
        requested,
        onRequest,
        theme
    } = props;
    const styles = jsx(theme);

    return (
        <>
            <List.Item
                style={styles.container}
                title={title}
                description={`By: ${artist}`}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                left={() =>
                    imageUri
                        ?
                            <Image
                                source={{
                                    uri: imageUri,
                                }}
                                style={styles.image}
                            />
                        :
                            <Icon
                                name='image-off'
                                type='MaterialCommunityIcons'
                                size={styles.image.height}
                            />
                }
                right={() => (
                    <View
                        style={styles.buttonWrapper}
                    >
                        <ThemedButton
                            mode={MODE.CONTAINED}
                            onPress={() => onRequest(id)}
                            size='xs'
                            disabled={requested}
                            width={120}
                        >
                            {requested
                                ? 'REQUESTED'
                                : 'REQUEST'
                            }
                        </ThemedButton>
                    </View>
                    
                )}
            />
            <Divider />
        </>
    )
}

export default withTheme(RequestSongItem);