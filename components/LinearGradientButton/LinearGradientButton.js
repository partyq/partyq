import React from 'react';
import { withTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../hoc/Wrapper';

import jsx from './LinearGradientButton.style';

const LinearGradientButton = (props) => {
    const styles = jsx(props.theme, props.width ? props.width : Dimensions.get('window').width * 0.75);

    return (
        <Wrapper>
            {props.unselected ?
                <Button
                    title={props.children}
                    titleStyle={styles.text}
                    raised
                    type={'clear'}
                    disabled={props.disabled}
                    containerStyle={styles.container}
                    buttonStyle={styles.button}
                    onPress={props.onPress}
                /> :
                <Button
                    title={props.children}
                    titleStyle={styles.text}
                    raised
                    type={'solid'}
                    disabled={props.disabled}
                    containerStyle={styles.container}
                    buttonStyle={styles.button}
                    onPress={props.onPress}

                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [styles.colorBegin.color, styles.colorEnd.color],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 0 }
                    }}
                />}
        </Wrapper>
    );
}

export default withTheme(LinearGradientButton);