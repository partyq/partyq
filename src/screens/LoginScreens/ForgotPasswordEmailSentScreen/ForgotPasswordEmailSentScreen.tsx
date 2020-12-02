import React from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import jsx from './ForgotPasswordEmailSentScreen.style';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';

interface iForgotPasswordEmailSentScreenProps {
    theme: any,
    navigation: any,
    route: any
}

const ForgotPasswordEmailSentScreen = (props: iForgotPasswordEmailSentScreenProps) => {
    const {
        theme,
        navigation,
        route
    } = props;

    const {
        email
    } = route.params;

    const styles = jsx(theme);

    const onLoginPressed = async () => {
        navigation.navigate('Login');
    }

    return (
        <BackgroundContainer
            disableBack
        >
            <View
                style={styles.topPadding}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Reset Password Email Sent
                </Text>
                <Text style={styles.description}>
                    We have sent an email to{' '}
                    <Text style={styles.email}>
                        {email}
                    </Text>
                    {' '}with a link to reset your password.
                </Text>
            </View>
            <ThemedButton
                mode={MODE.CONTAINED}
                onPress={onLoginPressed}
            >
                Back to Login
            </ThemedButton>
        </BackgroundContainer>
    )
}

export default withTheme(ForgotPasswordEmailSentScreen);