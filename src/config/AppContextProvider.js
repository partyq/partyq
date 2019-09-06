import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Provider as PaperProvider } from 'react-native-paper';

import { Dark } from '../assets/style/theme';


const Context = React.createContext();

export class AppContextProvider extends React.Component {
  state = {
    theme: Dark,
    updateTheme: (theme) => {
      this.setState({ theme });
    },
    service: '',
    updateService: (service) => {
      this.setState({ service });
    },
  }

  render() {
    const { theme } = this.state;
    return (
      <Context.Provider value={this.state}>
        <PaperProvider theme={theme}>
          {this.props.children}
        </PaperProvider>
      </Context.Provider>
    );
  }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
