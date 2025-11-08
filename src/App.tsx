// src/App.tsx - MINIMAL FINAL VERSION
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuthListener } from './hooks/useAuth';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'; // The minimal Home Page

// Placeholder routes
const NotFound = () => <div className="p-20 text-center">404 Not Found</div>;

// Component to handle global auth listener
const AuthProvider: React.FC = () => {
  useAuthListener();
  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider />
      <Toaster position="bottom-right" reverseOrder={false} />

      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Route */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;