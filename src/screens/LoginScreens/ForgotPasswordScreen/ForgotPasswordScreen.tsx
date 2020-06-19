import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { withTheme, ActivityIndicator, Colors } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import jsx from './ForgotPasswordScreen.style';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import ThemedTextInput from '../../../components/ThemedTextInput/ThemedTextInput';
import { useValueUpdateEffect } from '../../../utility/hooks';

interface iForgotPasswordScreenProps {
    theme: any,
    navigation: any
}

const ForgotPasswordScreen = (props: iForgotPasswordScreenProps) => {
    const {
        theme,
        navigation
    } = props;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [loading, setLoading] = useState(false);

    const styles = jsx(theme);

    const onSendLinkPressed = async () => {
        setLoading(true);
        try {
            await auth()
                .sendPasswordResetEmail(email);
        } catch (err) {
            console.log(err);
            setLoading(false);
            return;
        }
        navigation.navigate('ForgotPasswordEmailSent', {
            email: email
        });
    }

    const canProceed = 
        email !== '' &&
        emailError === '';

    useValueUpdateEffect(() => {
        if (email === '') {
            setEmailError('You must provide an email address.');
        } else {
            setEmailError('');
        }
    }, email);

    return (
        <BackgroundContainer
            navigation={navigation}
        >
            <View
                style={styles.topPadding}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Forgot Password?
                </Text>
                <Text style={styles.description}>
                    Please enter your email address and we will send you a link to reset your password.
                </Text>
            </View>
            <View style={styles.sendLinkContainer}>
                <ThemedTextInput
                    value={email}
                    onChange={(value: string) => setEmail(value)}
                    placeholder='Email'
                    error={emailError}
                />
                <ThemedButton
                    mode={MODE.CONTAINED}
                    onPress={onSendLinkPressed}
                    disabled={!canProceed || loading}
                >
                    {loading
                        ? (
                            <ActivityIndicator 
                                animating={true}
                                color={Colors.grey500}
                            />
                        )
                        : 'Send Reset Password Link'}
                </ThemedButton>
            </View>
        </BackgroundContainer>
    )
}

export default withTheme(ForgotPasswordScreen);