import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { withTheme } from 'react-native-paper';

import BackgroundContainer from '../../../hoc/BackgroundContainer';
import jsx from './ChoosePlanScreen.style';
import Carousel from 'react-native-snap-carousel';
import { iPlan } from '../../../utility/types';
import PlanItem from '../../../components/PlanItem/PlanItem';
import ThemedButton, { MODE } from '../../../components/ThemedButton/ThemedButton';

const PLANS: iPlan[] = [
    {
        name: 'Free Plan',
        features: [
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf',
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf'
        ],
        monthlyPrice: 0
    },
    {
        name: 'Basic Plan',
        features: [
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf',
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf'
        ],
        monthlyPrice: 19.97
    },
    {
        name: 'Premium Plan',
        features: [
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf',
            'Lorem ipsum dolor sit amet, consectetur.',
            'Lorem ipsum dolor sit amet, consectetur. alsjfal;sdj jasjdf'
        ],
        monthlyPrice: 29.97
    }
]

interface iChoosePlanScreenProps {
    theme: any,
    navigation: any
}

const ChoosePlanScreen = (props: iChoosePlanScreenProps) => {
    const {
        theme,
        navigation
    } = props;

    const [selectedPlan, setSelectedPlan] = useState('Free Plan');

    const styles = jsx(theme);

    const onNextPressed = () => {
        navigation.navigate('Home');
    }

    const renderCarouselItem = ({item, index}: {item: iPlan, index: number}) => {
        return (
            <PlanItem
                key={index}
                name={item.name}
                features={item.features}
                monthlyPrice={item.monthlyPrice}
                selected={item.name === selectedPlan}
                onSelect={() => setSelectedPlan(item.name)}
            />
        )
    }

    return (
        <BackgroundContainer
            disableBack
        >
            <View
                style={styles.topPadding}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    Choose a Plan
                </Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur.
                </Text>
            </View>
            <Carousel
                layout='default'
                data={PLANS}
                renderItem={renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
            />
            <ThemedButton
                mode={MODE.CONTAINED}
                onPress={onNextPressed}
            >
                {selectedPlan === 'Free Plan'
                    ? 'Start Partying!'
                    : 'Start 30 day free trial'}
            </ThemedButton>
        </BackgroundContainer>
    )
}

export default withTheme(ChoosePlanScreen);