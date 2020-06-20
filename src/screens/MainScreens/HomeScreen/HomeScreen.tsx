import React from 'react';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { Card } from 'react-native-paper';
import { View, Text } from 'react-native';

import { iUser } from '../../../utility/types';
import jsx from './HomeScreen.style';

import { SafeAreaView } from 'react-native-safe-area-context';

interface iHomeScreenProps {
    user: iUser,
    theme: any,
    navigation: any
}

const HomeScreen = (props: iHomeScreenProps) => {
    const {
        user,
        theme,
        // navigation
    } = props;

    const styles = jsx(theme);

    const getDisplayName = (name: string) => {
        return name.split(' ')[0];
    }

    return (
        <>
            <Card
                elevation={3}
                style={styles.topBar}
            >
                <SafeAreaView
                    edges={['top']}
                    style={styles.topBarWrapper}
                >
                    <View
                        style={styles.grow}
                    />
                    <Text style={styles.title}>
                        Hi, {getDisplayName(user.fullName)}
                    </Text>
                    <Text>
                        Time to get your party on!
                    </Text>
                </SafeAreaView>
            </Card>
        </>
    )
};

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user
});

export default connect(
    mapStateToProps,
    null
)(
    HomeScreen
);