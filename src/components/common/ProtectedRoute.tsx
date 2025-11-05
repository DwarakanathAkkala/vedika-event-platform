import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    // 1. Show a loading screen while Firebase status is being checked
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl font-semibold text-indigo-600 animate-pulse">Loading VEDIKA Stage...</p>
            </div>
        );
    }

    // 2. Redirect unauthenticated users to the login page
    if (!isAuthenticated) {
        // Navigate is used to replace the current route in history
        return <Navigate to="/auth" replace />;
    }

    // 3. Render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;