import { DefaultTheme } from 'react-native-paper';

export const Dark = {
    colors: {
        ...DefaultTheme.colors,
        primary: '#DB486D',

        // background colors
        backgroundDark: '#263652',
        backgroundLight: '#080B10',
        background: '#FFFFFF',

        // accent
        primaryAccent: '#DB486D',
        secondaryAccent: '#633895'
    },
    fonts: {
        family: 'sans-serif',
        color: '#FFFFFF',
        dark: '#555',
        disabled: '#dfe6e9',
        small: 14,
        regular: 18,
        medium: 26,
        large: 34
    },
    roundness: 50
};