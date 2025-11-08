// src/stores/useAuthStore.ts
import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void; // Final fix in this action
    setError: (error: string | null) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start as true on initial app load
    error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false, // Loading resolves here
            error: null,
        }),

    setLoading: (isLoading) => set({ isLoading }),

    logout: () => set({ ...initialState, isLoading: false }),

    setError: (error) => set({ error, isLoading: false }),
}));