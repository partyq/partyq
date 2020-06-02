import React from 'react';
import NavigationHeader from '../../../../components/NavigationHeader/NavigationHeader';
import { withTheme } from 'react-native-paper';

interface iRequestASongScreenProps {
    theme: any
}

const RequestASongScreen = (props: iRequestASongScreenProps) => {
    return (
        <>
            <NavigationHeader
                isSlider={true}
                canGoBack={false}
                title='Request a Song'
            />
        </>
    );
}

export default withTheme(RequestASongScreen);