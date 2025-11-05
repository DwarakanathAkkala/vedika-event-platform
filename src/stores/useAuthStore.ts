import { create } from 'zustand';
import type { User } from '../types';

// Define the shape of the state
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean; // True while checking Firebase Auth status
    error: string | null;
}

// Define the actions
interface AuthActions {
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void;
    setError: (error: string | null) => void;
}

// Combine State and Actions into the Store Interface
type AuthStore = AuthState & AuthActions;

// Initial state for the store
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Critical: Starts true to check auth status on app load
    error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState, // Spread initial state

    // ACTIONS
    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user, // True if user is not null
            isLoading: false,
            error: null,
        }),

    setLoading: (isLoading) => set({ isLoading }),

    logout: () => set(initialState), // Reset to initial state upon logout

    setError: (error) => set({ error, isLoading: false }),
}));