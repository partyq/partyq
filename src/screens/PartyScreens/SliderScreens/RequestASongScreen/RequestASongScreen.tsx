import React from 'react';
import NavigationHeader from '../../../../components/NavigationHeader/NavigationHeader';
import RequestSongItem from '../../../../components/RequestSongItem/RequestSongItem';
import SearchScreen from '../../../../components/SearchScreen/SearchScreen';
import { Track, SearchType } from '../../../../utility/MusicServices/MusicService';
import { getProviderInstance } from '../../../../actions';
import { connect } from 'react-redux';
import { SongRequest, addSongRequest } from '../../../../utility/backend';

interface iRequestASongScreenProps {
    getProviderInstance: () => any,
    allowLibraryRequests: boolean,
    requests: SongRequest[],
    partyId: string,
    username: string
}

const RequestASongScreen = (props: iRequestASongScreenProps) => {
    const {
        getProviderInstance,
        allowLibraryRequests,
        requests,
        partyId,
        username
    } = props;

    const search = async (query: string): Promise<Track[]> => {
        if (!query) return [];
        try {
            const instance = getProviderInstance();
            if (instance !== undefined) {
                return await instance.getSearchResults(query, SearchType.TRACK);
            }
        }
        catch (error) {
            console.log(error);
        }
        return [];
    }

    const getServiceData = async (): Promise<Track[]> => {
        try {
            const instance = getProviderInstance();
            if (instance !== undefined) {
                return await instance.getServiceTracks();
            }
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    const getLibraryData = async (): Promise<Track[]> => {
        try {
            const instance = getProviderInstance();
            if (instance !== undefined) {
                return await instance.getLibraryTracks();
            }
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    return (
        <>
            <NavigationHeader
                isSlider={true}
                canGoBack={false}
                title='Request a Song'
            />
            <SearchScreen
                ignoreSafeArea
                noHeader
                search={search}
                getServiceData={getServiceData}
                getLibraryData={getLibraryData}
                renderItem={({ item, index }) => (
                    <RequestSongItem
                        id={item.trackUri}
                        title={item.title}
                        artist={item.artists}
                        imageUri={item.imageUri}
                        requested={requests.find((req) => req.songId === item.trackUri) !== undefined}
                        onRequest={() => addSongRequest(
                            item.trackUri,
                            partyId,
                            username
                        )}
                    />
                )}
                keyExtractor={(item: Track) => item.trackUri}
                navigation={null}
                disableLibrary={!allowLibraryRequests}
            />

        </>
    );
}

const mapStateToProps = (state: any) => ({
    allowLibraryRequests: state.partyReducer.allowLibraryRequests,
    requests: state.partyReducer.requests,
    partyId: state.partyReducer.partyId,
    username: state.userReducer.username
});

const mapDispatchToProps = (dispatch: Function) => ({
    getProviderInstance: () => dispatch(getProviderInstance())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    RequestASongScreen
);