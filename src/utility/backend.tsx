import firestore from '@react-native-firebase/firestore';

import { PartyStatus } from '../states/partyState';

export const createParty = (playlistId: string) => {
    return new Promise<string>(async (resolve) => {
        const querySnapshot = await firestore()
            .collection('parties')
            .orderBy('id', 'desc')
            .limit(1)
            .get()
        let lastPartyId;
        if (querySnapshot.empty) {
            lastPartyId = 0;
        } else {
            lastPartyId = parseInt(querySnapshot.docs[0].get('id'));
        }
        lastPartyId += 1;
        const partyId = `0000${lastPartyId}`.slice(-5);
        await firestore()
            .collection('parties')
            .add({
                id: partyId,
                playlistId,
                playlistIndex: 0,
                hostName: ""
            })
        return resolve(partyId);
    });
}

export const getPartyById = (id: string) => {
    return new Promise<string | null>(async (resolve) => {
        const querySnapshot = await firestore()
            .collection('parties')
            .where('id', '==', id)
            .limit(1)
            .get()
        if (querySnapshot.empty) {
            return resolve(null);
        }
        const doc = querySnapshot.docs[0];
        return resolve(doc.get('partyId') as string);
    });
}

export const getUser = (partyId: string, username: string) => {
    return new Promise<string | null>(async (resolve) => {
        const querySnapshot = await firestore()
            .collection('users')
            .where('partyId', '==', partyId)
            .where('displayName', '==', username)
            .limit(1)
            .get()
        if (querySnapshot.empty) {
            return resolve(null);
        }
        const doc = querySnapshot.docs[0];
        return resolve(doc.get('displayName') as string);
    })
}

export const joinParty = (partyId: string, username: string) => {
    return new Promise<string>(async (resolve, reject) => {
        const displayName = await getUser(partyId, username);
        if (displayName !== null) {
            return reject(PartyStatus.USER_ALREADY_EXISTS);
        }
        await firestore()
            .collection('users')
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
            .collection('users')
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
            .collection('parties')
            .where('id', '==', partyId)
            .limit(1)
            .get();
        if (!partiesQuerySnapshot.empty) {
            batch.delete(partiesQuerySnapshot.docs[0].ref);
        }
        const usersQuerySnapshot = await firestore()
            .collection('users')
            .where('partyId', '==', partyId)
            .get();
        usersQuerySnapshot.forEach((docSnapshot) => {
            batch.delete(docSnapshot.ref);
        });
        await batch.commit();
        return resolve();
    })
}