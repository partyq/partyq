import React from 'react';
import { TextInput, withTheme, HelperText } from 'react-native-paper';
import { View } from 'react-native';

// import jsx from './ThemedTextInput.style';

interface iThemedTextInputProps {
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    secureTextEntry?: true,
    theme: any,
    error?: string
}

const ThemedTextInput = (props: iThemedTextInputProps) => {
    const {
        value,
        onChange,
        placeholder,
        secureTextEntry,
        error,
        // theme
    } = props;

    // const styles = jsx(theme);

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={onChange}
                theme={{
                    colors: {
                        placeholder: 'rgba(0, 0, 0, 0.3)'
                    }
                }}
                mode='outlined'
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                error={
                    error !== undefined && 
                    error !== null &&
                    error !== ''
                }
            />
            <HelperText
                type='error'
                visible={error}
            >
                {error}
            </HelperText>
        </View>
        
    )
}

export default withTheme(ThemedTextInput);