import React from 'react';
import LinearGradient from 'react-native-linear-gradient'

import Entrance from '../../components/Entrance/Entrance';
import SelectProvider from '../../components/SelectProvider/SelectProvider';
import EnterPartyCode from '../../components/EnterPartyInfo/EnterPartyInfo';
import { HOME_VIEWS } from '../../Utility/Constants';

class HomeScreen extends React.Component {

    state = {
        currentView: HOME_VIEWS.HOME
    }

    handleChangeView = (view) => {
        this.setState({ currentView: view });
    }

    render() {
        alert(JSON.stringify(this.props.theme));
        return (

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#263652', '#080B10']} style={{ flex: 1 }}>
                {this.state.currentView === HOME_VIEWS.HOME && <Entrance changeView={this.handleChangeView} />}
                {this.state.currentView === HOME_VIEWS.START && <SelectProvider changeView={this.handleChangeView} navigate={this.props.navigation.navigate} />}
                {this.state.currentView === HOME_VIEWS.ENTER_CODE && <EnterPartyCode changeView={this.handleChangeView} navigate={this.props.navigation.navigate} />}
            </LinearGradient>
        );
    }
}

export default HomeScreen;