import React from 'react';
import { Text, View } from 'react-native';
import { withTheme, Card } from 'react-native-paper';

import jsx from './PlanItem.style';

interface iPlanItemProps {
    name: string,
    features: string[],
    monthlyPrice: number,
    theme: any,
    onSelect: () => void,
    selected: boolean
}

const PlanItem = (props: iPlanItemProps) => {
    const {
        theme,
        name,
        features,
        monthlyPrice,
        onSelect,
        selected
    } = props;

    const styles = jsx(theme);

    return (
        <Card 
            elevation={3}
            style={[
                styles.container,
                selected
                    ? styles.containerSelected
                    : null
            ]}
            onPress={onSelect}
        >
            <Text style={styles.title}>
                {name}
                {selected && (
                    <Text style={styles.selectedText}>
                        {' '}(Selected)
                    </Text>
                )}
            </Text>
            <View>
                {features.map(feature => (
                    <Text style={styles.feature}>
                        - {feature}
                    </Text>
                ))}
            </View>
            <View
                style={styles.grow}
            />
            <Text style={styles.price}>
                {monthlyPrice}$/mo.
            </Text>
        </Card>
    )
}

export default withTheme(PlanItem);