// src/components/common/Layout.tsx (Full file)
import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen">
            {/* 1. Global Header/Nav */}
            <Header />

            {/* 2. Main Content Area */}
            {/* pt-16 ensures content starts below the fixed header */}
            <main className="pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;