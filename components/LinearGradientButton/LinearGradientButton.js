import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import jsx from './LinearGradientButton.style';

const LinearGradientButton = (props) => {
    const styles = jsx(props.theme);

    return (
        <Button
            title={props.children}
            titleStyle={styles.text}
            raised
            type='solid'
            containerStyle={styles.container}
            buttonStyle={styles.button}
            onPress={props.onPress}

            ViewComponent={LinearGradient}
            linearGradientProps={{
                colors: [styles.colorBegin.color, styles.colorEnd.color],
                start: { x: 0, y: 0},
                end: { x: 1, y: 0}
            }}
        />

    );
}

export default withTheme(LinearGradientButton);