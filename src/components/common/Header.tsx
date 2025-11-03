import React from 'react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    // Mobile-first structure: Hamburger button visible on mobile, nav always visible on desktop
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="fixed top-0 z-50 w-full bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6">
                {/* Logo and App Name */}
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-gray-900">
                    <Logo className="h-8 w-8 text-[rgb(var(--color-primary))]" />
                    <span>VEDIKA</span>
                </Link>

                {/* Desktop Navigation & Auth Button */}
                <nav className="hidden md:flex md:items-center md:space-x-4">
                    <Link to="/auth">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link to="/auth">
                        <Button variant="primary">Create Event</Button>
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {/* SVG for Hamburger/Close Icon (Placeholder) */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown (Toggle visibility based on isOpen state) */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link to="/auth" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full">Sign In</Button>
                        </Link>
                        <Link to="/auth" onClick={() => setIsOpen(false)}>
                            <Button variant="primary" className="w-full">Create Event</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;