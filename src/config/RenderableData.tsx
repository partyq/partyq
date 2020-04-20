/* eslint-disable import/no-unresolved */

import { ImageSourcePropType } from "react-native";

/* eslint-disable global-require */
export const START_A_PARTY = 'Start a Party';
export const JOIN_A_PARTY = 'Join a Party';

export interface iProvider {
  name: string,
  img: ImageSourcePropType,
  selected: boolean,
};

export const Provider = {
  title: 'Select a Provider',
  paragraph: 'By linking any of these accounts you will be able to host a room and play music from that account',
  moreComing: 'More coming soon!',
  providers: [
    {
      name: 'Spotify',
      img: require('../assets/img/Spotify_Icon_RGB_Green.png'),
      selected: false,
    },
    // {
    //   name: 'Apple Music',
    //   img: require('../assets/img/Apple_Music_Icon.png'),
    //   selected: false
    // },
  ],
};