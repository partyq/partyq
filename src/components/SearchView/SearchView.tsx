/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
} from 'react-native';
import { SearchBar, SearchBarProps } from 'react-native-elements';
import { withTheme } from 'react-native-paper';

import jsx from './SearchView.style';

export interface iSearchView extends SearchBarProps {
  theme: any,
};

const SearchView = (props: iSearchView) => {
  const styles = jsx(props.theme);

  return (
    <View style={styles.searchContainer}>
      <SearchBar
        placeholder='Search'
        round={true}
        lightTheme={true}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.inputText}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        value={props.value}
      />
    </View>
  );
};

export default withTheme(SearchView);
