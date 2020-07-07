import React from 'react';
import { View, Text } from 'react-native';

import jsx from './HeaderBar.style';
import { withTheme } from 'react-native-paper';

interface iHeaderBar {
    title?: string,
    left?: React.ReactElement,
    right?: React.ReactElement,
    theme: any
}

const HeaderBar = (props: iHeaderBar) => {
    const {
        title,
        left,
        right,
        theme
    } = props;

    console.log(right);

    const styles = jsx(theme);

    return (
        <View style={styles.bar}>
            <View style={styles.item}>
                {left}
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={[
                styles.item,
                styles.alignRight
            ]}>
                {right}
            </View>
        </View>
    )
}

export default withTheme(HeaderBar);