import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { List, Colors, Card, withTheme } from 'react-native-paper';

import jsx from './TabBar.style';

export interface iTab {
    name: string,
    icon: string,
    route: string
}

interface iTabItemProps {
    name: string,
    icon: string,
    route: string,
    subroute?: string,
    navigation: any,
    styles?: {
        title?: {
            default: any,
            active?: any
        },
        icon?: any,
    },
    isActive: boolean,
    onChange: () => void,
    theme: any
}

const TabItem = (props: iTabItemProps) => {
    const {
        name,
        icon,
        route,
        subroute,
        navigation,
        styles,
        isActive,
        onChange,
        theme
    } = props;

    const onPress = () => {
        if (!isActive) {
            if (subroute) {
                navigation.navigate(route, {
                    screen: subroute
                });
            } else {
                navigation.navigate(route);
            }
            onChange();
        }
    }

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <List.Icon
                icon={icon}
                color={isActive
                    ? theme.colors.primary
                    : Colors.grey500}
                style={styles?.icon}
            />
            <Text 
                style={isActive
                    ? styles?.title?.active
                    : styles?.title?.default}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

interface iTabBarProps {
    theme: any,
    navigation: any,
    tabs: iTab[],
    active: string,
    onChangeActive: (name: string) => void
}

const MainTabBar = (props: iTabBarProps) => {
    const {
        navigation,
        theme,
        tabs,
        active,
        onChangeActive
    } = props;

    const styles = jsx(theme);

    return (
        <Card
            elevation={3}
            style={styles.tabBar}
        >
            <SafeAreaView
                edges={['bottom']}
            >
                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={styles.tabList}
                    data={tabs}
                    renderItem={({item, index}) => {
                        const routeComponents = item.route.split('/');
                        let subroute;
                        if (routeComponents.length > 1) {
                            subroute = routeComponents[1];
                        }
                        return <TabItem
                            key={index}
                            name={item.name}
                            icon={item.icon}
                            route={routeComponents[0]}
                            subroute={subroute}
                            navigation={navigation}
                            styles={{
                                title: {
                                    default: styles.tabItemTitle,
                                    active: styles.active
                                },
                                icon: styles.tabItemIcon
                            }}
                            isActive={active === item.name}
                            onChange={() => onChangeActive(item.name)}
                            theme={theme}
                        />
                    }}
                />
            </SafeAreaView>
        </Card>
    )
}

export default withTheme(MainTabBar);