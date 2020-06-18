import React from 'react';
import { View, Text } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';

import jsx from './NavigationHeader.style';
import { withSlider } from '../PartyViewSlider/PartyViewSlider';

interface iNavigationHeaderProps {
    navigation?: any,
    theme: any,
    title?: string,
    canGoBack?: boolean,
    isSlider?: boolean,
    onCloseSlider: () => void,
    onBeforeBack?: () => void,
}

const NavigationHeader = (props: iNavigationHeaderProps) => {
    const {
        navigation,
        theme,
        title,
        isSlider,
        onCloseSlider
    } = props;

    const styles = jsx(theme);

    let canGoBack = props.canGoBack;
    if (canGoBack === undefined) {
        if (navigation) {
            canGoBack = navigation.canGoBack();
        } else {
            canGoBack = false
        }
    }

    const onBackPressed = () => {
        if (props.onBeforeBack) {
            props.onBeforeBack();
        }

        if (canGoBack && navigation) {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.header}>
            {canGoBack 
                ?
                <IconButton
                    icon='chevron-left'
                    onPress={onBackPressed}
                />
                : 
                isSlider && (
                    <IconButton
                        icon='close'
                        onPress={onCloseSlider}
                    />
                )
            }
            <Text style={styles.title}>
                {title}
            </Text>
            <IconButton
                icon='close'
                style={styles.hidden}
                onPress={() => null}
                disabled
            />
        </View>
    )
}

export default withTheme(
    withSlider(NavigationHeader)
);