// src/components/common/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// 💥 FIX: Removed unused Button import
import Logo from '../ui/Logo';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Styling for the simple bold text links (matching the image)
    const navLinkStyle = "text-lg font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-200";

    return (
        <header className="fixed top-0 z-50 w-full bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6">
                {/* Logo and App Name */}
                <Link to="/" className="flex items-center space-x-2 text-2xl font-black tracking-tight text-gray-900">
                    <Logo className="h-8 w-8 text-indigo-600" />
                    <span>VEDIKA</span>
                </Link>

                {/* Desktop Navigation (Clean, Bold Links) */}
                <nav className="hidden md:flex md:items-center md:space-x-8">
                    <Link to="/auth" className={navLinkStyle}>
                        Sign In
                    </Link>
                    <Link to="/auth" className={`${navLinkStyle} text-indigo-600`}>
                        Create Event
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden text-gray-600 p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {/* SVG Icon logic remains */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 border-t border-gray-100' : 'max-h-0'}`}>
                <div className="flex flex-col space-y-2 p-4 bg-white">
                    <Link to="/auth" onClick={() => setIsOpen(false)} className={navLinkStyle}>
                        Sign In
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)} className={`${navLinkStyle} text-indigo-600`}>
                        Create Event
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;