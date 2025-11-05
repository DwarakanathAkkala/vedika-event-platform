// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../stores/useAuthStore';
import type { User } from '../types';

/**
 * Custom hook to listen to Firebase Auth state and synchronize it with the Zustand store.
 * This runs once on app load to determine the initial auth status.
 */
export const useAuthListener = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber function
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in. Fetch or create the user document in Firestore.
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                const userData: User = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    isNewUser: !userSnap.exists(), // True if document doesn't exist
                    hasCompletedOnboarding: userSnap.data()?.hasCompletedOnboarding || false,
                    eventHistory: userSnap.data()?.eventHistory || [],
                };

                if (!userSnap.exists()) {
                    // If this is a brand new sign-in, create the initial user document
                    await setDoc(userRef, userData, { merge: true });
                }

                setUser(userData); // Update Zustand store with the full user object
            } else {
                // User is signed out.
                setUser(null);
            }
            // Set loading to false ONLY after the initial check is complete
            setLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [setUser, setLoading]);
};