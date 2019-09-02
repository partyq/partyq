import React from 'react';
import { withTheme } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

const BackgroundContainer = (props) => {

    const {theme} = props;
    const style = { flex: 1};

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[theme.colors.backgroundDark, theme.colors.backgroundLight]}
            style={props.style ? props.style : style}>

            {props.children}

        </LinearGradient>
    )
};

export default withTheme(BackgroundContainer);