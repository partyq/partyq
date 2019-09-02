import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { withTheme } from 'react-native-paper';

import jsx from './SelectProvider.style';
import BackgroundContainer from '../../hoc/BackgroundContainer';
import { Services } from '../../config/RenderableData';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';

const SelectProvider = (props) => {

    const styles = jsx(props.theme);

    const handleAuth = () => {
        alert('hi')
        // props.navigation.navigate('SelectDefaultPlaylist')
    }

    const handleSelected = (name) => {
        alert(name)
    }

    const renderService = () => (
        <View style={styles.services}>
            {Services.services.map((item, i) => (
                <TouchableOpacity
                    key={i}
                    activeOpacity={.5}
                    onPress={() => handleSelected(item.name)}
                    style={styles.button}
                >
                    <Image
                        source={item.img}
                        style={styles.image}
                        key={i}
                        width={props.theme.fonts.medium}
                        height={props.theme.fonts.medium}
                    />
                    <Text style={styles.buttonText} key={i}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <BackgroundContainer style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{Services.title}</Text>
                <Text style={styles.paragraph}>{Services.paragraph}</Text>
            </View>
            {renderService()}
            <LinearGradientButton onPress={handleAuth}>Finish</LinearGradientButton>
        </BackgroundContainer>
    );
}

export default withTheme(SelectProvider);