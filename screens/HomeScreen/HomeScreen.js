import React from 'react'
import { ImageBackground } from 'react-native'

import Home from '../../components/Home/Home'
import SelectProvider from '../../components/SelectProvider/SelectProvider'
import EnterPartyCode from '../../components/EnterPartyCode/EnterPartyCode'

import {HOME_VIEWS} from '../../Utility/Constants'


class HomeScreen extends React.Component {

    state = {
        currentView: HOME_VIEWS.HOME
    }

    handleChangeView = (view) => {
        this.setState({currentView: view});
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/img/initial_wallpaper.gif')}
                style={{ flex: 1, flexDirection: 'column' }}
            >                
                {this.state.currentView === HOME_VIEWS.HOME && <Home changeView={this.handleChangeView} />}
                {this.state.currentView === HOME_VIEWS.START && <SelectProvider changeView={this.handleChangeView}/>}
                {this.state.currentView === HOME_VIEWS.ENTER_CODE && <EnterPartyCode changeView={this.handleChangeView}/>}

            </ImageBackground>
        );
    }
}

export default HomeScreen;