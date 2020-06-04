import firestore from '@react-native-firebase/firestore';

import store from '../store/store';
import { Alert } from 'react-native';

export const PARTIES_COLLECTION = 'parties';
export const PLAYLISTS_COLLECTION = 'playlists';
export const SONG_REQUESTS_COLLECTION = 'songRequests';
export const USERS_COLLECTION = 'users';
export const VOTES_COLLECTION = 'votes';

export interface PartyMember {
    name: string
}

export interface SongRequest {
    partyId: string,
    requester: string,
    requestedAt: Date,
    songId: string
}

export interface SongVote {
    partyId: string,
    songId: string,
    username: string,
    value: number
}

export const createParty = async (playlistId: string, provider: any): Promise<any> => {

    const getPartyId = async (querySnapshot: any): Promise<any> => {
        let partyId;
        const lastPartyId = querySnapshot.empty ?
            0 :
            parseInt(querySnapshot.docs[0].get('id'));

        if (lastPartyId === 9999) {
            querySnapshot = await firestore()
                .collection(PARTIES_COLLECTION)
                .orderBy('created', 'asc')
                .limit(1)
                .get();
            const oldParty = querySnapshot.docs[0];
            partyId = `0000${oldParty.get('id')}`.slice(-5);
            oldParty.ref.delete();
        } else {
            partyId = `0000${lastPartyId + 1}`.slice(-5);
        }

        return partyId;
    };

    let querySnapshot = await firestore()
        .collection(PARTIES_COLLECTION)
        .orderBy('created', 'desc')
        .limit(1)
        .get();

    const partyId = await getPartyId(querySnapshot);
    const playlist = await provider.getPlayList(playlistId);
    if (playlist.tracks.length === 0) {
        throw 'The playlist you selected has no songs.'
    }
    const userProfile = await provider.getUserProfile();
    const partyRecord = await firestore()
        .collection(PLAYLISTS_COLLECTION)
        .add(playlist);
        
    const newParty = await firestore()
        .collection(PARTIES_COLLECTION)
        .add({
            id: partyId,
            created: new Date(),
            hostName: userProfile.displayName,
            token: provider.getToken(),
            playlistId: partyRecord.id,
            currentPlayListSongIndex: 0,
        });

    const docId = await newParty.id;

    return {partyId, docId};
};
export const changeDefaultPlayList = async (playlistId: string, partyId: string, docId: string, provider: any): Promise<void> => {
    
    const oldPlayListId = await firestore()
        .collection(PARTIES_COLLECTION)
        .where('id', '==', partyId)
        .limit(1)
        .get();   
            
    await firestore()
        .collection(PLAYLISTS_COLLECTION)
        .doc(oldPlayListId.docs[0].data().playlistId)
        .delete();
    
    const playlist = await provider.getPlayList(playlistId);
    if (playlist.tracks.length === 0) {
        throw 'The playlist you selected has no songs.'
    }
    const partyRecord = await firestore()
        .collection(PLAYLISTS_COLLECTION)
        .add(playlist);
    
    await firestore()
        .collection(PARTIES_COLLECTION)
        .doc(docId)
        .update({
            playlistId: partyRecord.id,
            currentPlayListSongIndex: 0,
        });
    
};

export const getPartyById = (id: string) => {
    return new Promise<string | null>(async (resolve) => {
        const querySnapshot = await firestore()
            .collection(PARTIES_COLLECTION)
            .where('id', '==', id)
            .limit(1)
            .get()
        if (querySnapshot.empty) {
            return resolve(null);
        }
        const doc = querySnapshot.docs[0];
        return resolve(doc.get('id') as string);
    });
}

export const isValidUsername = (partyId: string, username: string) => {
    return new Promise<boolean>(async (resolve) => {
        let querySnapshot = await firestore()
            .collection(USERS_COLLECTION)
            .where('partyId', '==', partyId)
            .where('displayName', '==', username)
            .limit(1)
            .get()
        if (!querySnapshot.empty) {
            return resolve(false);
        }
        querySnapshot = await firestore()
            .collection(PARTIES_COLLECTION)
            .where('hostName', '==', username)
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            return resolve(false);
        }
        return resolve(true);
    })
}

export const joinParty = async (partyId: string, username: string): Promise<string> => {
    const usernameValid = await isValidUsername(partyId, username);
    if (!usernameValid) {
        throw 'A user with that name already exists.';
    }
    await firestore()
        .collection(USERS_COLLECTION)
        .add({
            displayName: username,
            partyId: partyId
        });
    return partyId;
}


export const leaveParty = (username: string) => {
    return new Promise(async (resolve) => {
        const querySnapshot = await firestore()
            .collection(USERS_COLLECTION)
            .where('displayName', '==', username)
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            return;
        }
        const doc = querySnapshot.docs[0];
        await doc.ref.delete();
        return resolve();
    })
}

export const endParty = (partyId: string) => {
    return new Promise(async (resolve) => {
        const batch = firestore().batch();
        const partiesQuerySnapshot = await firestore()
            .collection(PARTIES_COLLECTION)
            .where('id', '==', partyId)
            .limit(1)
            .get();
        if (!partiesQuerySnapshot.empty) {
            batch.delete(partiesQuerySnapshot.docs[0].ref);
        }
        const usersQuerySnapshot = await firestore()
            .collection(USERS_COLLECTION)
            .where('partyId', '==', partyId)
            .get();
        usersQuerySnapshot.forEach((docSnapshot) => {
            batch.delete(docSnapshot.ref);
        });
        await batch.commit();
        return resolve();
    })
}

export const partyMembersListener: Function = (
    partyId: string,
    handler: (members: PartyMember[]) => void
) => {
    const subscriber = firestore()
        .collection(USERS_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            (documentSnapshot) => {
                const members: PartyMember[] = documentSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        name: data.displayName as string
                    }
                });
                handler(members);
            }
        )
    return () => subscriber();
}

export const songRequestsListener: Function = (
    partyId: string,
    handler: (songRequests: SongRequest[]) => void
) => {
    const subscriber = firestore()
        .collection(SONG_REQUESTS_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            (documentSnapshot) => {
                const songRequests: SongRequest[] = documentSnapshot.docs.map(
                    doc => doc.data() as SongRequest);
                handler(songRequests);
            }
        )
    return () => subscriber();
}

export const votesListener: Function = (
    partyId: string,
    handler: (votes: SongVote[]) => void
) => {
    const subscriber = firestore()
        .collection(VOTES_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            (documentSnapshot) => {
                const votes: SongVote[] = documentSnapshot.docs.map(
                    doc => doc.data() as SongVote);
                handler(votes);
            }
        )
    return () => subscriber();
}

export const voteOnSong = async (
    partyId: string,
    songId: string,
    username: string,
    value: 1 | -1
) => {
    const querySnapshot = await firestore()
        .collection(VOTES_COLLECTION)
        .where('partyId', '==', partyId)
        .where('songId', '==', songId)
        .where('username', '==', username)
        .limit(1)
        .get();
    if (querySnapshot.empty) {
        await firestore()
            .collection(VOTES_COLLECTION)
            .add({
                partyId: partyId,
                songId: songId,
                username: username,
                value: value
            });
    } else {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        await firestore()
            .collection(VOTES_COLLECTION)
            .doc(doc.id)
            .update({
                value: value
            });
    }
}