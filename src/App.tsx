// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout and Pages
import Layout from './components/common/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

const NotFound = () => <div className="text-center pt-20">404 | Not Found</div>;

const App: React.FC = () => {
  return (
    <Router>
      {/* Toaster is outside the Layout to ensure it sits on top of everything */}
      <Toaster
        position="bottom-right"
      // ... (Toast styling as previously defined)
      />

      {/* Layout wraps all content pages */}
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;