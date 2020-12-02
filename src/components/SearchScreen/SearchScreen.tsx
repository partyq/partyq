import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTheme, Text, Divider } from 'react-native-paper';

import jsx from './SearchScreen.style';
import BackgroundContainer from '../../hoc/BackgroundContainer';
import SearchView from '../SearchView/SearchView';
import { View, Dimensions } from 'react-native';
import ThemedButton, { MODE } from '../ThemedButton/ThemedButton';
import { FlatList } from 'react-native-gesture-handler';

interface iSearchScreenProps {
    theme: any,
    providerId: string,
    search: (query: string) => Promise<any[]>,
    getServiceData: () => Promise<any[]>,
    getLibraryData: () => Promise<any[]>,
    renderItem: (data: {item: any, index: number}) => React.ReactElement,
    onBeforeBack?: () => void,
    ignoreSafeArea?: true,
    noHeader?: true,
    title?: string,
    keyExtractor: (item: any) => any,
    navigation: any,
    disableLibrary?: boolean
}

const SearchScreen = (props: iSearchScreenProps) => {
    const {
        theme,
        providerId,
        search,
        getLibraryData,
        getServiceData,
        renderItem,
        onBeforeBack,
        ignoreSafeArea,
        noHeader,
        title,
        keyExtractor,
        navigation,
        disableLibrary
    } = props;

    const styles = jsx(theme);
    const buttonWidth = Dimensions.get('window').width * 0.4;

    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [unselectButton, setUnselectedButton] = useState({
        service: false,
        library: true,
    });

    // useEffect(() => {
    //     setData(getServiceData());
    // }, []);

    useEffect(() => {
        if (query === '') {
            let getData;
            if (!unselectButton.service) {
                getData = getServiceData();
            } else {
                getData = getLibraryData();
            }
            getData.then(
                (_data: any[]) => {
                    setData(_data);
                }
            )
        }
    }, [unselectButton]);

    const handleQueryChange = (q: string) => {
        if (q) {
            setQuery(q);
        } else {
            setQuery('');
        }
    };

    const handleButton = (id: string): void => {
        setQuery('');
        if (id === 'service') {
            setUnselectedButton({ service: false, library: true });
        } else if (id === 'library') {
            setUnselectedButton({ service: true, library: false });
        }
    };

    const onEndSearch = () => {
        search(query).then(
            (_data: any[]) => {
                setData(_data);
            }
        );
    }

    return (
        <BackgroundContainer
            navigation={navigation}
            onBeforeBack={onBeforeBack}
            ignoreSafeArea={ignoreSafeArea!}
            noHeader={noHeader}
            title={
                <Text style={styles.headingText}>
                    {title}
                </Text>
            }
        >
            <SearchView
                onChangeText={handleQueryChange}
                onEndEditing={onEndSearch}
                value={query}
            />
            <View style={styles.buttonsContainer}>
                <ThemedButton
                    width={buttonWidth}
                    mode={unselectButton.service ? MODE.TEXT : MODE.CONTAINED}
                    onPress={() => handleButton('service')}
                >
                    {providerId}
                </ThemedButton>
                <ThemedButton
                    width={buttonWidth}
                    mode={unselectButton.library ? MODE.TEXT : MODE.CONTAINED}
                    onPress={() => handleButton('library')}
                    disabled={disableLibrary}
                >
                    Library
                </ThemedButton>
            </View>

            <View style={styles.listContainer}>
                <Divider />
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        </BackgroundContainer>
    )
}

const mapStateToProps = (state: any) => ({
    providerId: state.miscReducer.providerId
});

export default connect(mapStateToProps,null)(withTheme(SearchScreen));