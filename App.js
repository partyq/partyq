/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Wrapper from './hoc/Wrapper';
import Entrance from './pages/Entrance/Entrance.js'

const App = () => {
    return (
        <Wrapper>
            <Entrance/>
        </Wrapper>
    );
};

export default App;
