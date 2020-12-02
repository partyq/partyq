import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text } from 'react-native';
import { withTheme, ActivityIndicator, Colors } from 'react-native-paper';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';

import jsx from './RegisterScreen.style';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import ThemedTextInput from '../../../components/ThemedTextInput/ThemedTextInput';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';
import { useValueUpdateEffect } from '../../../utility/hooks';
import { iUser } from '../../../utility/types';
import { setUser } from '../../../actions/userActions';
import { connect } from 'react-redux';

interface iRegisterScreenProps {
    theme: any,
    navigation: any,
    setUser: (user: iUser) => void,
}

const RegisterScreen = (props: iRegisterScreenProps) => {
    const {
        theme,
        navigation,
        setUser,
    } = props;

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const styles = jsx(theme);

    const onNextPressed = async () => {
        let user;
        setLoading(true);
        try {
            const createResult = await functions()
                .httpsCallable('createUser')({
                    email: email,
                    username: username,
                    password: password,
                    fullName: name
                });
            if (createResult.data.error) {
                const error = createResult.data.error;
                if (error.code === 'invalid-email') {
                    setEmailError(error.messageText);
                } else if (error.code === 'invalid-username') {
                    setUsernameError(error.messageText);
                } else {
                    // TODO: Handle unexpected errors
                }
                setLoading(false);
                return;
            }
            const userCredentials = await auth()
                .signInWithEmailAndPassword(email, password);
            user = userCredentials.user;
        } catch (err) {
            // TODO: Handle unexpected errors
            console.log(err);
            setLoading(false);
            return;
        }
        try {
            await user.sendEmailVerification();
        } catch (err) {
            // TODO: Handle unexpected errors
            console.log(err);
            setLoading(false);
            return;
        }
        setUser({
            email: email,
            username: username,
            fullName: name,
            uid: user.uid
        });
        navigation.navigate('VerifyEmail');
    }

    const canProceed = 
        name !== '' &&
        nameError === '' &&
        username !== '' &&
        usernameError === '' &&
        email !== '' &&
        emailError === '' &&
        password !== '' &&
        passwordError === '' &&
        confirmPassword !== '' &&
        confirmPasswordError === '';

    const onRequiredTextFieldChange = (value: string, setError: (error: string) => void) => {
        if (value === '') {
            setError('You must provide this value.');
        } else {
            setError('');
        }
    }

    [
        {
            value: name,
            onError: setNameError
        },
        {
            value: username,
            onError: setUsernameError
        }
    ].map(field => useValueUpdateEffect(() => {
        onRequiredTextFieldChange(field.value, field.onError);
    }, field.value));

    useValueUpdateEffect(() => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase())) {
            setEmailError('You must provide a valid email address.');
        } else {
            setEmailError('');
        }
    }, email);

    useValueUpdateEffect(() => {
        if (
            password.length < 6 || 
            password.length > 32 ||
            !/\d/.test(password) ||
            !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
        ) {
            setPasswordError('Your password must be 6-32 characters long and contain at lest 1 digit and 1 symbol.');
        } else {
            setPasswordError('');
        }
    }, password);

    useValueUpdateEffect(() => {
        if (password !== confirmPassword || confirmPassword === '') {
            setConfirmPasswordError('Your passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    }, confirmPassword);

    return (
        <BackgroundContainer
            navigation={navigation}
        >
            <View
                style={styles.topPadding}
            />
            <View>
                <Text style={styles.title}>
                    Let’s Get Started!
                </Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur.
                </Text>
            </View>
            <View style={styles.registerContainer}>
                <ThemedTextInput
                    value={name}
                    onChange={(value: string) => setName(value)}
                    placeholder='Full Name'
                    error={nameError}
                />
                <ThemedTextInput
                    value={email}
                    onChange={(value: string) => setEmail(value)}
                    placeholder='Email Address'
                    error={emailError}
                />
                <ThemedTextInput
                    value={username}
                    onChange={(value: string) => setUsername(value)}
                    placeholder='Username'
                    error={usernameError}
                />
                <ThemedTextInput
                    value={password}
                    onChange={(value: string) => setPassword(value)}
                    placeholder='Password'
                    secureTextEntry
                    error={passwordError}
                />
                <ThemedTextInput
                    value={confirmPassword}
                    onChange={(value: string) => setConfirmPassword(value)}
                    placeholder='Confirm Password'
                    secureTextEntry
                    error={confirmPasswordError}
                />
                <ThemedButton
                    mode={MODE.CONTAINED}
                    disabled={!canProceed || loading}
                    onPress={onNextPressed}
                >
                    {loading
                        ? (
                            <ActivityIndicator 
                                animating={true}
                                color={Colors.grey500}
                            />
                        )
                        : 'Next'}
                </ThemedButton>
            </View>
            <View
                style={styles.grow}
            />
            <View>
                <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text 
                        style={styles.loginText}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </BackgroundContainer>
    )
}

const mapDispatchToState = (dispatch: Function) => ({
    setUser: (user: iUser) => dispatch(setUser(user))
});

export default connect(
    null,
    mapDispatchToState
)(
    withTheme(RegisterScreen)
);