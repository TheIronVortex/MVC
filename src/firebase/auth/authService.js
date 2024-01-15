import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export const setupAuthStateListener = (auth, db) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // Log the user object for debugging
            console.log("User data: ", user);

            // User is signed in, save or update user info in Realtime Database
            const userRef = ref(db, 'users/' + user.uid);
            set(userRef, {
                uid: user.uid,
                displayName: user.displayName || 'N/A',
                email: user.email || 'N/A',
                photoURL: user.photoURL || 'N/A',
                // ... any other user info you want to save
            }).catch((error) => {
                // Log detailed error
                console.error("Error writing to Realtime Database", error);
            });
        } else {
            // User is signed out
            // Handle sign-out related logic
        }
    });

    return unsubscribe;
};
