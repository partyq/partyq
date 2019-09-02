import React from 'react';
import { Dark } from '../assets/style/theme';

import { Provider as PaperProvider } from 'react-native-paper';

const Context = React.createContext();

export class AppContextProvider extends React.Component {

    state = {
        theme: Dark,
        updateTheme: (theme) => {
            this.state({theme: theme});
        }
    }

    render() {
        const { theme } = this.state;
        return (
            <Context.Provider value={ this.state }>
                <PaperProvider theme={ theme }>
                    { this.props.children }
                </PaperProvider>
            </Context.Provider>
        );
    }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;