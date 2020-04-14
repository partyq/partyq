/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import {
  withTheme,
  List,
  Text,
} from 'react-native-paper';
import { connect } from 'react-redux';

import jsx from './PreviewPlayListScreen.style';
import PlayListItem from '../../../components/PlayListItem/PlayListItem';
import BackgroundContainer from '../../../hoc/BackgroundContainer';
import {
  iPlayList,
  iTrack,
  iPlayListDetails,
} from '../../../utility/MusicServices/SpotifyService';
import {
  getProviderInstance,
  setProviderId,
} from '../../../actions';

export interface iSelectDefaultPlayListScreen {
  theme: any,
  navigation: any,
  getProviderInstance: () => any,
  setProviderId: (providerId: string) => void,
  playListDetails: iPlayList,
  route: any,
};

export interface iTracksSectionProps {
  styles: any,
  tracks: iTrack[],
};

export interface iPLayListDescription {
  description: string,
};

const PreviewPlayListScreen = (props: iSelectDefaultPlayListScreen) => {
  const styles = jsx(props.theme);
  const playListId = props.route.params.playListId;

  const [playList, setPlayList] = useState<iPlayListDetails | undefined>(undefined);

  useEffect(() => {
    getPlayList();
  }, []);

  const getPlayList = async (): Promise<void> => {
    try {
      const instance = props.getProviderInstance();
      if (instance !== undefined) {
        const data = await instance.getPlayList(playListId);
        setPlayList(data);
      }
      else {
        setPlayList(undefined);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const onBeforeBack = async (): Promise<void> => {
    props.setProviderId('');
  };

  const finish = (): void => {
    props.navigation.navigate('PartyMain');
  };

  return (
    <BackgroundContainer
      navigation={props.navigation}
      onBeforeBack={onBeforeBack}
    >
      <List.Section>

      </List.Section>
      {playList && playList.description ? 
        <PlayListDescription description={playList.description} />
        : null
      }
      <List.Section>
        {playList ?
          <Tracks styles={styles} tracks={playList.tracks} />
          : null
        }
      </List.Section>
    </BackgroundContainer>
  );
};

const PlayListDescription = ({description}: iPLayListDescription ) => (
  <List.Section>
    <Text>{description}</Text>
  </List.Section>
);

const Tracks = ({ styles, tracks }: iTracksSectionProps) => (
  <View style={styles.listContainer}>
    <FlatList
      data={tracks}
      renderItem={({ item }) => (
        <PlayListItem
          image={item.image}
          title={item.title}
          description={`By: ${item.artists}`}
          key={item.id}
        />
      )}
      keyExtractor={(item: iTrack) => item.id}
    />
  </View>
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProviderInstance: () => dispatch(getProviderInstance()),
    setProviderId: (providerId: string) => dispatch(setProviderId(providerId)),
  }
};

export default connect(null, mapDispatchToProps)(withTheme(PreviewPlayListScreen));
