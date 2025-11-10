// src/pages/HomePage.tsx - MINIMAL WORKING PAGE
import React from 'react';
import Button from '../components/ui/Button';
import { signOutUser } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';

const HomePage: React.FC = () => {
    const { user } = useAuthStore();
    const welcomeName = user?.displayName || user?.email || 'Organizer';

    const handleSignOut = () => {
        signOutUser();
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[calc(100vh-8rem)]">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                Welcome, {welcomeName}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Authentication Flow is now fully functional.
            </p>

            <Button
                variant="primary"
                onClick={handleSignOut}
                className="bg-rose-600 hover:bg-rose-700 text-white text-lg px-8 py-3"
            >
                Sign Out
            </Button>

            {/* Minimal content to satisfy the "Home Page" requirement */}
            <div className="mt-12 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500">
                    This page is awaiting Phase 3: Event Creation Wizard.
                </p>
            </div>
        </div>
    );
}

export default HomePage;