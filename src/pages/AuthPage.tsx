import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import Button from '../components/ui/Button';
import { signInWithGoogle } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';
import AuthGif from '../assets/Authentication.gif';

// Framer Motion Variants
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Component for the GIF
const AuthVisual: React.FC = () => (
    <div className="flex justify-center mb-6">
        {/* Increased size from w-40 h-40 to w-48 h-48 */}
        <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-xl border-4 border-indigo-200 overflow-hidden">
            <img
                src={AuthGif}
                alt="VEDIKA Authentication Visual"
                className="w-full h-full object-cover"
            />
        </div>
    </div>
);

const AuthPage: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthStore();
    const navigate = useNavigate();

    // Redirect authenticated users from the auth page
    if (isAuthenticated && !isLoading) {
        navigate('/home', { replace: true });
        return null;
    }

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    const buttonClass = "w-full text-lg py-3 rounded-xl transition-all duration-300 shadow-lg";

    return (
        <motion.div
            className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            <motion.div
                // Increased max-w-md to give the larger GIF room, kept border-t-8 for emphasis
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-8 border-indigo-600"
                variants={cardVariants}
            >
                <AuthVisual /> {/* VISUAL SECTION */}

                {/* Text Content */}
                <h2 className="text-3xl font-black text-center text-gray-900 mb-1">
                    Start Your VEDIKA
                </h2>
                <p className="text-center text-base text-gray-600 mb-6">
                    The fastest way to manage your event is here.
                </p>

                {/* 1. GOOGLE AUTH BUTTON */}
                <Button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className={`
            ${buttonClass} 
            bg-indigo-600 text-white hover:bg-indigo-700 
            flex items-center justify-center space-x-3
          `}
                >
                    {isLoading ? (
                        <span className="animate-pulse">Loading...</span>
                    ) : (
                        <>
                            {/* Google Icon SVG */}
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 4.88632C13.9161 4.88632 15.658 5.53858 17.0701 6.83754L20.4468 3.46083C18.4239 1.57945 15.4855 0.556641 12.0003 0.556641C7.30606 0.556641 3.23594 3.12354 1.25879 6.94396L5.27555 9.8787C6.18241 7.42068 8.78453 5.88632 12.0003 5.88632V4.88632Z" fill="#EA4335" /><path d="M22.7479 11.9749C22.7479 11.3323 22.6865 10.7303 22.5694 10.1585H12.0003V13.9213H18.1542C17.8488 15.6698 16.8925 17.1517 15.5398 18.0691L19.5566 20.9926C21.7828 18.9135 23.0003 15.9392 23.0003 11.9749V11.9749H22.7479Z" fill="#4285F4" /><path d="M5.27555 14.0711L1.25879 17.0058C3.23594 20.8263 7.30606 23.3932 12.0003 23.3932C15.4855 23.3932 18.4239 22.3603 20.4468 20.4789L17.0701 17.1022C15.658 18.3895 13.9161 19.0418 12.0003 19.0418C8.78453 19.0418 6.18241 17.5074 5.27555 15.0494L5.27555 14.0711Z" fill="#34A853" /><path d="M1.25879 6.94396L5.27555 9.8787C4.77864 11.0505 4.54575 12.2985 4.54575 13.593C4.54575 14.9205 4.77864 16.1471 5.27555 17.319L1.25879 20.2537C0.457816 18.7061 0.000326581 16.8967 0.000326581 14.9781C0.000326581 12.9863 0.461973 11.166 1.25879 9.56303V9.56303L1.25879 6.94396Z" fill="#FBBC05" /></svg>
                            <span>Sign In / Sign Up with Google</span>
                        </>
                    )}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default AuthPage;