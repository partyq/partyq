import React from 'react';

import Entrance from '../../components/Entrance/Entrance';
import SelectProvider from '../../components/SelectProvider/SelectProvider';
import EnterPartyCode from '../../components/EnterPartyInfo/EnterPartyInfo';
import { HOME_VIEWS } from '../../Utility/Constants';
import BackgroundContainer from '../../hoc/BackgroundContainer';
import {withTheme} from 'react-native-paper';

class HomeScreen extends React.Component {

    state = {
        currentView: HOME_VIEWS.HOME
    }

    handleChangeView = (view) => {
        this.setState({ currentView: view });
    }

    render() {
        return (
            <BackgroundContainer theme={this.props.theme}>
                {this.state.currentView === HOME_VIEWS.HOME && <Entrance changeView={this.handleChangeView} />}
                {this.state.currentView === HOME_VIEWS.START && <SelectProvider changeView={this.handleChangeView} navigate={this.props.navigation.navigate} />}
                {this.state.currentView === HOME_VIEWS.ENTER_CODE && <EnterPartyCode changeView={this.handleChangeView} navigate={this.props.navigation.navigate} />}
            </BackgroundContainer>
        );
    }
}

export default withTheme(HomeScreen);