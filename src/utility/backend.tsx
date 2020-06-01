import firestore from '@react-native-firebase/firestore';

import store from '../store/store';

export const PARTIES_COLLECTION = 'parties';
export const SONG_REQUESTS_COLLECTION = 'songRequests';
export const USERS_COLLECTION = 'users';

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