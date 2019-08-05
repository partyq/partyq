import React from 'react'
import { ImageBackground } from 'react-native'

import Home from '../../components/Home/Home'
import SelectProvider from '../../components/SelectProvider/SelectProvider'

import {ENTRANCE_VIEWS} from '../../Utility/Constants'

class Entrance extends React.Component {

    state = {
        currentView: ENTRANCE_VIEWS.HOME
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

                {this.state.currentView === ENTRANCE_VIEWS.HOME && <Home changeView={this.handleChangeView} />}
                {this.state.currentView === ENTRANCE_VIEWS.START && <SelectProvider changeView={this.handleChangeView}/>}

            </ImageBackground>
        );
    }
}

export default Entrance;