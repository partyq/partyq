import React, { useState, useRef, useEffect } from 'react';
import { IconButton, withTheme, Card, List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import MainNavigationContainer from './MainNavigationContainer';
import TabBar, { iTab } from '../../components/TabBar/TabBar';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iFriend, iUser } from '../../utility/types';
import { setUser } from '../../actions';
import { connect } from 'react-redux';

const TABS: iTab[] = [
    {
        name: 'Home',
        icon: 'home',
        route: 'Main/Home'
    },
    {
        name: 'Parties',
        icon: 'music-circle',
        route: ''
    },
    {
        name: 'Friends',
        icon: 'account-group',
        route: 'Main/Friends'
    },
    {
        name: 'Account',
        icon: 'account',
        route: ''
    }
]

interface iManagePartyButtonProps {
    title: string,
    icon: string,
    route: string,
    navigation: any
}

const ManagePartyButton = (props: iManagePartyButtonProps) => {
    const {
        title,
        icon,
        route,
        navigation
    } = props;

    const onPress = () => {
        navigation.navigate(route);
    }

    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                // backgroundColor: 'blue',
                width: 100
            }}
            onPress={onPress}
        >
            <List.Icon
                icon={icon}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 25,
                    height: 50,
                    width: 50
                }}
            />
            <Text style={{
                color: 'white',
                fontWeight: '800',
                fontSize: 12
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

interface iManagePartyOverlayProps {
    navigation: any,
    visible: boolean,
    onClose: () => void,
    verticalPosition: number
}

const ManagePartyOverlay = (props: iManagePartyOverlayProps) => {
    const {
        navigation,
        visible,
        onClose,
        verticalPosition
    } = props;

    return (
        <View
            style={[
                {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 999
                },
                visible
                    ? {
                        display: 'flex'
                    }
                    : {
                        display: 'none'
                    }
            ]}
        >
            <TouchableOpacity
                onPress={onClose}
                style={{
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: 0.7
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    height: '100%',
                    left: '10%',
                    width: '80%',
                    // backgroundColor: 'red',
                    // opacity: 0.5,
                    top: verticalPosition - 80,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}
            >
                <ManagePartyButton 
                    title='Create Party'
                    icon='home'
                    route=''
                    navigation={navigation}
                />
                <ManagePartyButton 
                    title='Join Party'
                    icon='home'
                    route=''
                    navigation={navigation}
                />
            </View>
        </View>
    )
}

interface iMainScreenWrapperProps {
    navigation: any,
    theme: any,
    setUser: (user: iUser) => void,
    user: iUser
}

const MainScreenWrapper = (props: iMainScreenWrapperProps) => {
    const {
        navigation,
        theme,
        user
    } = props;

    const [activeTab, setActiveTab] = useState('Home');
    const [managePartyOverlayVisible, setManagePartyOverlayVisible] = useState(false);
    
    const [partyButtonsY, setPartyButtonsY] = useState(0);

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(
                (snapshot) => {
                    const friends = snapshot.docs.map(doc => (
                        doc.data() as iFriend
                    ));
                    setFriends(friends);
                }
            )
        return () => subscriber();
    }, [])

    return (
        <>
            <MainNavigationContainer />
            <View
                style={{
                    zIndex: 1000,
                    width: '100%',
                    height: 0,
                    borderRadius: 40,
                    position: 'relative',
                    bottom: 40
                }}
                onLayout={(layoutEvent) => {
                    const layout = layoutEvent.nativeEvent.layout;
                    setPartyButtonsY(layout.y);
                }}
            >
                <Card
                    style={{
                        alignItems: 'center',
                    }}
                    elevation={3}
                >
                    <IconButton
                        icon={managePartyOverlayVisible
                            ? 'close'
                            : 'plus'}
                        color='white'
                        style={{
                            backgroundColor: theme.colors.primary,
                            width: 70,
                            height: 70,
                            borderRadius: 35
                        }}
                        onPress={() => setManagePartyOverlayVisible(!managePartyOverlayVisible)}
                    />
                </Card>
            </View>
            <TabBar
                navigation={navigation}
                tabs={TABS}
                active={activeTab}
                onChangeActive={(name: string) => setActiveTab(name)}
            />
            <ManagePartyOverlay 
                navigation={navigation}
                visible={managePartyOverlayVisible}
                onClose={() => setManagePartyOverlayVisible(false)}
                verticalPosition={partyButtonsY}
            />
        </>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Function) => ({
    setUser: (user: iUser[]) => dispatch(setUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTheme(MainScreenWrapper)
);