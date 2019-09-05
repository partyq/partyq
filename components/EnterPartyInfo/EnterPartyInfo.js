import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native';
import { withTheme } from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

import jsx from './EnterPartyInfo.style'
import BackgroundContainer from '../../hoc/BackgroundContainer';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';

const EnterPartyCode = (props) => {

    const styles = jsx(props.theme);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [isCodeValide, setIsCodeValide] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    pinInput = React.createRef();

    const checkCode = (code) => {
        if (code != '12345') {
            pinInput.current.shake().then(() => setCode(''));
        }
        else {
            setDisableButton(false);
            setIsCodeValide(true);
        }
    }

    const handleNavigation = () => props.navigation.navigate('Party');

    return (
        <BackgroundContainer style={styles.container} navigation={props.navigation} >
            <View style={styles.wrappingContainer}>
                <Text style={styles.text}>Enter a party code</Text>

                {isCodeValide ?
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a funny name :)"
                        onChangeText={(name) => setName(name)}
                        value={name}
                    />
                    : <SmoothPinCodeInput
                        ref={pinInput}
                        value={code}
                        onTextChange={code => setCode(code)}
                        onFulfill={checkCode}
                        codeLength={5}
                        cellSpacing={6}
                        cellSize={40}
                        cellStyleFocused={styles.cellStyleFocused}
                        cellStyle={styles.cellStyle}
                        textStyle={styles.textStyle}
                        textStyleFocused={styles.textStyleFocused}
                    />}

                <LinearGradientButton disabled={disableButton} onPress={handleNavigation}>Join the Party!</LinearGradientButton>
            </View>
        </BackgroundContainer>
    );
}

export default withTheme(EnterPartyCode);