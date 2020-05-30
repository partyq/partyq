import firestore from '@react-native-firebase/firestore';

import store from '../store/store';

export const PARTIES_COLLECTION = 'parties';
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

export const createParty = (playlistId: string, provider: any) => {
    return new Promise<{
        partyId: string,
        initialId: string
    }>(async (resolve, reject) => {
        let querySnapshot = await firestore()
            .collection(PARTIES_COLLECTION)
            .orderBy('created', 'desc')
            .limit(1)
            .get()
        let lastPartyId;
        if (querySnapshot.empty) {
            lastPartyId = 0;
        } else {
            lastPartyId = parseInt(querySnapshot.docs[0].get('id'));
        }
        let partyId;
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
        const playlist = await provider.getPlayList(playlistId);
        if (playlist.tracks.length === 0) {
            return reject('The playlist you selected has no songs.');
        }
        const initialId = playlist.tracks[0].id;
        let nextSongId = null;
        if (playlist.tracks.length > 1) {
            nextSongId = playlist.tracks[1].id;
        }
        const userProfile = await provider.getUserProfile();
        await firestore()
            .collection(PARTIES_COLLECTION)
            .add({
                id: partyId,
                hostName: userProfile.displayName,
                currentSongTimeElapsed: 0,
                previousSongId: null,
                currentSongId: initialId,
                nextSongId: nextSongId,
                token: provider.getToken(),
                created: new Date()
            })
        return resolve({partyId, initialId});
    });
}

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

export const joinParty = (partyId: string, username: string) => {
    return new Promise<string>(async (resolve, reject) => {
        const usernameValid = await isValidUsername(partyId, username);
        if (!usernameValid) {
            return reject('A user with that name already exists.');
        }
        await firestore()
            .collection(USERS_COLLECTION)
            .add({
                displayName: username,
                partyId: partyId
            })
        return resolve(partyId);
    })
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

export const partyMembersListener: Function = async (
    partyId: string, 
    handler: (members: PartyMember[]) => void
) => {
    const subscriber = await firestore()
        .collection(USERS_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            async (documentSnapshot) => {
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

export const songRequestsListener: Function = async (
    partyId: string,
    handler: (songRequests: SongRequest[]) => void
) => {
    const subscriber = await firestore()
        .collection(SONG_REQUESTS_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            async (documentSnapshot) => {
                const songRequests: SongRequest[] = documentSnapshot.docs.map(
                    doc => doc.data() as SongRequest);
                handler(songRequests);
            }
        )
    return () => subscriber();
}

export const votesListener: Function = async (
    partyId: string,
    handler: (votes: SongVote[]) => void
) => {
    const subscriber = await firestore()
        .collection(VOTES_COLLECTION)
        .where('partyId', '==', partyId)
        .onSnapshot(
            async (documentSnapshot) => {
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