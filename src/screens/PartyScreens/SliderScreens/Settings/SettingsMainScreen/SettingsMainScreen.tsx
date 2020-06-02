import React from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import ThemedButton, { MODE } from '../../../../../components/Button/ThemedButton';
import NavigationHeader from '../../../../../components/NavigationHeader/NavigationHeader';

interface iSettingsMenuItem {
    title: string,
    icon: string,
    screenName: string
}

const SETTING_MENUS: iSettingsMenuItem[] = [
    {
        title: 'Default Playlist',
        icon: 'playlist-music',
        screenName: 'DefaultPlaylist'
    }
];

interface SettingsMenuItemProps {
    title: string,
    icon: string,
    onPress: () => null | null | undefined
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
    return (
        <List.Item
            title={props.title}
            left={() => <List.Icon icon={props.icon} />}
            right={() => <List.Icon icon='chevron-right' />}
            onPress={props.onPress}
        />
    );
}

interface iSettingsMainScreenProps {
    navigation: any,
    theme: any
}

const SettingsMainScreen = (props: iSettingsMainScreenProps) => {
    return (
        <>
            <NavigationHeader
                navigation={props.navigation}
                isSlider={true}
                canGoBack={false}
                title='Party Settings'
            />
            <ScrollView>
                <List.Section>
                    {SETTING_MENUS.map((menu: iSettingsMenuItem, i: number) => (
                        <SettingsMenuItem
                            key={i}
                            title={menu.title}
                            icon={menu.icon}
                            onPress={() => props.navigation.navigate(menu.screenName)}
                        />
                    ))}
                </List.Section>
                <List.Section>
                    <ThemedButton
                        mode={MODE.CONTAINED}
                        onPress={() => null}
                    >
                        END PARTY
                    </ThemedButton>
                </List.Section>
            </ScrollView>
        </>
    );
}

export default SettingsMainScreen;