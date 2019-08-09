import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './EnterPartyInfo.style'
import { HOME_VIEWS } from '../../Utility/Constants'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

class EnterPartyCode extends React.Component {

    state = {
        code: '',
        name: '',
        isCodeValide: false,
        isNameEntered: false,
    }

    pinInput = React.createRef();

    checkCode = (code) => {
        if (code != '12345') {
            this.pinInput.current.shake()
                .then(() => this.setState({ code: '' }));
        }
        else {
            this.setState({isCodeValide: true});
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.backContainer}
                    activeOpacity={.5}
                    onPress={() => props.changeView(HOME_VIEWS.HOME)}
                >
                    <Text style={[styles.title, styles.text]}>Back</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
                    <View style={styles.wrappingContainer}>
                        <Text style={[styles.title, styles.text]}>Enter a party code</Text>

                       {this.state.isCodeValide ? 
                            <TextInput
                                style={styles.textInput}
                                placeholder="Type a funny name :)"
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                            />
                        : <SmoothPinCodeInput
                            ref={this.pinInput}
                            value={this.state.code}
                            onTextChange={code => this.setState({ code })}
                            onFulfill={this.checkCode}
                            codeLength={5}
                            cellSpacing={6}
                            cellSize={40}
                            cellStyleFocused={styles.cellStyleFocused}
                            cellStyle={styles.cellStyle}
                            textStyle={styles.textStyle}
                            textStyleFocused={styles.textStyleFocused}
                        />}

                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={.5}
                            onPress={() => props.changeView(HOME_VIEWS.HOME)}
                        >
                            <Text style={[styles.buttonText, styles.text]}>Join Party</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

export default EnterPartyCode;