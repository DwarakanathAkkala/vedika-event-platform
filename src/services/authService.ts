import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth } from './firebase';
import { useAuthStore } from '../stores/useAuthStore';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

/**
 * Handles Google Sign-In using a pop-up window.
 */
export const signInWithGoogle = async () => {
    const setError = useAuthStore.getState().setError;
    const setLoading = useAuthStore.getState().setLoading;

    try {
        setLoading(true);
        await signInWithPopup(auth, googleProvider);
        // The useAuthListener hook will catch the state change and update the store/loading state
        toast.success("Welcome to VEDIKA! You are signed in.");
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        setError("Failed to sign in with Google. Please try again.");
        toast.error("Sign-In failed. Please check the console for details.");
        setLoading(false); // Ensure loading is reset on failure
    }
};

/**
 * Handles user sign out.
 */
export const signOutUser = async () => {
    const logout = useAuthStore.getState().logout;
    const setError = useAuthStore.getState().setError;

    try {
        await signOut(auth);
        logout(); // Clear Zustand state
        toast.success("You have been signed out.");
    } catch (error) {
        console.error("Sign-Out Error:", error);
        setError("Failed to sign out. Please try again.");
        toast.error("Sign-Out failed.");
    }
};