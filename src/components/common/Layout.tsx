// src/components/common/Layout.tsx
import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Global Header/Nav */}
            <Header />

            {/* 2. Main Content Area */}
            {/* mt-16 provides space for the fixed header (approx. h-16) on mobile-first design */}
            <main className="pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* 3. Global Toast Notifications (already configured in App.tsx, but often grouped here) */}
            {/* NOTE: If Toaster is in App.tsx, we can remove it here, but keeping it in the top level is fine. */}
        </div>
    );
};

export default Layout;