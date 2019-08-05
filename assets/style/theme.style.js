import {Dimensions} from 'react-native';

export default {
    // FONT
    FONT_FAMILY: 'sans-serif',
    FONT_SIZE_EXTRA_SMALL: 18,
    FONT_SIZE_SMALL: 24,
    FONT_SIZE_MEDIUM: 32,
    FONT_SIZE_LARGE: 50,
    FONT_WEIGHT_LIGHT: 'normal',
    FONT_WEIGHT_MEDIUM: '600',
    FONT_WEIGHT_BOLD: 'bold',
    LETTER_SPACING: 1.1,

    // COLOR
    PRIMARY_COLOR: '#D81B60',
    PRIMARY_DARK_COLOR: '#c20449',
    PRIMARY_LIGHT_COLOR: '#e6578b',
    COLOR_WHITE: '#FFFFFF',

    // DIMENSIONS
    FULL_HEIGHT: Dimensions.get('window').height,
    FULL_WIDTH: Dimensions.get('window').width,

    // PADDING & MARGINS
    CONTAINER_PADDING: 20,
    SPACE_EXTRA_SMALL: 5,
    SPACE_SMALL: 10,
    SPACE_MEDIUM: 20,
    SPACE_LARGE: 30,
    BORDER_ROUND: 50
}