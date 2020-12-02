import React, { useEffect } from 'react';
import { withTheme } from 'react-native-paper';
import { View, Text, AppState } from 'react-native';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import jsx from './VerifyEmailScreen.style';
import { iUser } from '../../../utility/types';
import { connect } from 'react-redux';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { firebase } from '@react-native-firebase/auth';

interface iVerifyEmailScreenProps {
    theme: any,
    user: iUser,
    navigation: any
}

const VerifyEmailScreen = (props: iVerifyEmailScreenProps) => {
    const {
        theme,
        user,
        navigation
    } = props;

    const styles = jsx(theme);

    const onResendPressed = () => {
        firebase.auth().currentUser?.sendEmailVerification();
    }

    const onRedirectPressed = () => {
        navigateIfEmailVerified();
    }

    const navigateIfEmailVerified = async () => {
        await firebase.auth().currentUser?.reload();
        if (firebase.auth().currentUser?.emailVerified) {
            navigation.navigate('ChoosePlan');
        } else {
            // TODO: Handle with modal?
            console.log('Not verified.');
        }
    }

    useEffect(() => {
        navigateIfEmailVerified();
        AppState.addEventListener('change', state => {
            if (state === 'active') {
                navigateIfEmailVerified()
            }
        });
    }, []);

    return (
        <BackgroundContainer
            disableBack
        >
            <View
                style={styles.topPadding}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Confirm Your Email Address
                </Text>
                <Text style={styles.description}>
                    We have sent an email to{' '}
                    <Text style={styles.email}>
                        {user.email}
                    </Text>
                    {' '}with a confirmation link. 
                    Please click on the link to confirm your email and continue.
                </Text>
            </View>
            <View style={styles.resendContainer}>
                <Text style={styles.smallText}>
                    If you haven't received an email in a few minutes,
                    use the button below to resend the confirmation email.
                </Text>
                <ThemedButton
                    mode={MODE.CONTAINED}
                    onPress={onResendPressed}
                >
                    Resend Email
                </ThemedButton>
                <Text style={styles.smallText}>
                    Verified your email?{'\n'}
                    If you aren't redirected automatically,{' '}
                    <Text 
                        style={styles.verifiedText}
                        onPress={onRedirectPressed}
                    >
                        click here.
                    </Text>
                </Text>
            </View>
        </BackgroundContainer>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user
});

export default connect(
    mapStateToProps,
    null
)(
    withTheme(VerifyEmailScreen)
);