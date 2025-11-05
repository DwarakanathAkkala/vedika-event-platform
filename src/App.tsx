// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout and Pages (Need to be created next)
import Layout from './components/common/Layout';
import LandingPage from './pages/LandingPage';

// Placeholders for now
const AuthPage = () => <div className="p-20 text-center">Auth Page</div>;
const HomePage = () => <div className="p-20 text-center">Home Page</div>;
const NotFound = () => <div className="p-20 text-center">404 Not Found</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />

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