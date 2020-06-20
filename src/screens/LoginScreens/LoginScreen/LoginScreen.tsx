import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { withTheme, ActivityIndicator, Colors } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedTextInput from '../../../components/ThemedTextInput/ThemedTextInput';
import jsx from './LoginScreen.style';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { useValueUpdateEffect } from '../../../utility/hooks';
import { iUser } from '../../../utility/types';
import { setUser } from '../../../actions';
import { connect } from 'react-redux';

interface iLoginScreenProps {
    navigation: any,
    theme: any,
    setUser: (user: iUser) => void
}

const LoginScreen = (props: iLoginScreenProps) => {
    const {
        navigation,
        theme,
        setUser
    } = props;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setLoading] = useState(false);
    
    const styles = jsx(theme);

    const canProceed = 
        email !== '' &&
        emailError === '' &&
        password !== '' &&
        passwordError === '';

    const onLoginPressed = async () => {
        setLoading(true);
        let firebaseUser;
        try {
            const userCredentials = await auth()
                .signInWithEmailAndPassword(email, password);
            firebaseUser = userCredentials.user;
        } catch (err) {
            if (err.code === 'auth/invalid-email') {
                setEmailError('The email address you provided is invalid.');
            } else if (err.code === 'auth/user-not-found') {
                setEmailError('There is no account associated with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setPasswordError('The password you provided is incorrect.');
            } else {
                // TODO: Handle weird error
                console.log(err);
            }
            setLoading(false);
            return;
        }
        const userSnapshot = await firestore()
            .collection('users')
            .doc(firebaseUser.uid)
            // .where('email', '==', email)
            // .limit(1)
            .get();
        const user = userSnapshot.data() as iUser;
        // const user = userSnapshot.docs[0].data() as iUser;
        if (!user) {
            // TODO: Handle weird error
            console.log('User not found after logging in?');
            setLoading(false);
            return;
        }
        setUser(user);
        navigation.navigate('Main');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }

    const onRequiredTextFieldChange = (value: string, setError: (error: string) => void) => {
        if (value === '') {
            setError('You must provide this value.');
        } else {
            setError('');
        }
    }

    [
        {
            value: email,
            onError: setEmailError
        },
        {
            value: password,
            onError: setPasswordError
        }
    ].map(field => useValueUpdateEffect(() => {
        onRequiredTextFieldChange(field.value, field.onError);
    }, field.value));

    return (
        <BackgroundContainer
            navigation={navigation}
        >
            <View
                style={styles.topPadding}
            />
            <View>
                <Text style={styles.title}>
                    Welcome back!
                </Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur.
                </Text>
            </View>
            <View style={styles.loginContainer}>
                <ThemedTextInput
                    value={email}
                    onChange={(value: string) => setEmail(value)}
                    placeholder='Email'
                    error={emailError}
                />
                <ThemedTextInput
                    value={password}
                    onChange={(value: string) => setPassword(value)}
                    placeholder='Password'
                    secureTextEntry
                    error={passwordError}
                />
                <Text
                    style={styles.forgotPassword}
                    onPress={onForgotPasswordPressed}
                >
                    Forgot Password?
                </Text>
                <ThemedButton
                    mode={MODE.CONTAINED}
                    disabled={!canProceed || loading}
                    onPress={onLoginPressed}
                >
                    {loading
                        ? (
                            <ActivityIndicator 
                                animating={true}
                                color={Colors.grey500}
                            />
                        )
                        : 'Login'}
                </ThemedButton>
            </View>
            <View
                style={styles.grow}
            />
            <View>
                <Text style={styles.footerText}>
                    Don't have an account?{' '}
                    <Text 
                        style={styles.registerText}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Register Now
                    </Text>
                </Text>
            </View>
        </BackgroundContainer>
    )
}

const mapDispatchToProps = (dispatch: Function) => ({
    setUser: (user: iUser) => dispatch(setUser(user))
});

export default connect(
    null,
    mapDispatchToProps
)(
    withTheme(LoginScreen)
);