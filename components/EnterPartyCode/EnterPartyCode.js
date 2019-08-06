import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './EnterPartyCode.style'
import { ENTRANCE_VIEWS } from '../../Utility/Constants'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import Entrance from '../../pages/Entrance/Entrance';

class EnterPartyCode extends React.Component {

    state ={
        code: ''
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if(this.state.code.length === 5) this.checkCode();
    // }

    checkCode = () => {
        alert(this.state.code)
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.backContainer}
                    activeOpacity={.5}
                    onPress={() => props.changeView(ENTRANCE_VIEWS.HOME)}
                >
                    <Text style={[styles.title, styles.text]}>Back</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
                    <View style={styles.wrappingContainer}>
                        <Text style={[styles.title, styles.text]}>Enter a party code</Text>

                        <SmoothPinCodeInput
                            ref={this.pinInput}
                            value={this.state.code}
                            onTextChange={code => this.setState({ code })}
                            onFulfill={this._checkCode}
                            codeLength={5}
                            cellSpacing={6}
                            cellSize={40}
                            cellStyleFocused={styles.cellStyleFocused}
                            cellStyle={styles.cellStyle}
                            textStyle={styles.textStyle}
                            textStyleFocused={styles.textStyleFocused}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={.5}
                            onPress={() => props.changeView(ENTRANCE_VIEWS.HOME)}
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