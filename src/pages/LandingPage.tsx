// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import Button from '../components/ui/Button';

// 💥 GIF Imports from your provided context 💥
import MarriageGIF from '../assets/Marriage.gif'
import ConferenceGIF from '../assets/Conference.gif'
import CommunityGIF from '../assets/Community.gif'

// ----------------------------------------------------------------------
// COMPONENTS (New - Image Container for Responsiveness)
// ----------------------------------------------------------------------

interface ImageContainerProps {
    src: string; // URL for the GIF/Image
    alt: string;
    className?: string;
    isPlaceholder?: boolean;
}

// Reusable component to wrap the GIF/Image for perfect responsiveness
const ResponsiveImageContainer: React.FC<ImageContainerProps> = ({ src, alt, className, isPlaceholder = true }) => {
    return (
        <div className={`h-64 md:h-96 flex items-center justify-center rounded-xl bg-gray-200 text-gray-600 overflow-hidden ${className}`}>
            {isPlaceholder ? (
                <span className="text-lg font-medium">{alt}</span>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover max-w-full"
                    loading="lazy"
                />
            )}
        </div>
    );
};


// ----------------------------------------------------------------------
// ICON PLACEHOLDERS (For alternating sections)
// ... (WeddingIcon, CorporateIcon, CulturalIcon remain the same) ...
const WeddingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 21.5V17M6 17c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v4.5" /><path d="M10 4.5l2-2 2 2M12 2.5v5" /><path d="M17 10h-2M9 10H7" /></svg>
);
const CorporateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3L2 9l10 6 10-6L12 3z" /><path d="M2 15l10 6 10-6" /><path d="M12 3v18" /></svg>
);
const CulturalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V2H4v13z" /><path d="M2 16.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.5" /></svg>
);


// ----------------------------------------------------------------------
// FRAMER MOTION CONFIGURATION
// ... (container, item, itemRight variants remain the same) ...
const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1, }, }, };
const item: Variants = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }, };
const itemRight: Variants = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }, };


// ----------------------------------------------------------------------
// LANDING PAGE COMPONENT
// ----------------------------------------------------------------------
const LandingPage: React.FC = () => {
    return (
        <motion.div
            className="pb-16"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* 1. HERO SECTION (Attention Grabber - UI MATCH) */}
            <section className="text-center pt-16 pb-16 md:pt-28 md:pb-32 bg-white">
                <motion.h1
                    variants={item}
                    className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-none"
                >
                    Your Event, <span className="text-rose-500">Perfected.</span>
                </motion.h1>
                <motion.p
                    variants={item}
                    className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium border-b-2 border-gray-200 pb-6"
                >
                    From Intimate Gatherings to Grand Assemblies—Manage the entire lifecycle with VEDIKA's powerful, elegant platform.
                </motion.p>

                {/* 💥 BUTTONS: RESTORED to use variant prop and custom styling for unique Hero button 💥 */}
                <motion.div variants={item} className="mt-10 flex justify-center space-x-4">
                    <Link to="/auth">
                        {/* PRIMARY BUTTON: Use base primary variant, but override with specific hero shadow/color */}
                        <Button
                            variant="primary"
                            className="text-xl px-12 py-4 transition-all duration-300
                                       bg-indigo-600 hover:bg-indigo-700 text-white
                                       shadow-[0_4px_0_0_#f59e0b] hover:shadow-[0_2px_0_0_#f59e0b] active:shadow-none active:translate-y-[2px]"
                        >
                            Start Organizing Now
                        </Button>
                    </Link>
                    <Link to="/auth">
                        {/* SECONDARY BUTTON: Use base secondary variant, but override with specific hero styling */}
                        <Button
                            variant="ghost" // Use ghost for minimal style, but override with color
                            className="text-xl px-12 py-4 text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-300
                                       shadow-md hover:shadow-lg"
                        >
                            View Case Studies
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* 2. ALTERNATING FEATURE SECTIONS (The Dynamic Showcase) */}
            <section className="py-20 md:py-32">
                <motion.h2 variants={item} className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-20">
                    We Manage Every Kind of VEDIKA
                </motion.h2>

                {/* FEATURE BLOCK 1: WEDDINGS & GRAND EVENTS (TEXT LEFT / GIF RIGHT) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-24">
                    <motion.div variants={item} className="text-center md:text-left p-4">
                        <WeddingIcon className="w-12 h-12 mb-4 text-rose-500 mx-auto md:mx-0" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Cultural & Grand Ceremonies</h3>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            For events where tradition is paramount, VEDIKA ensures every detail—from custom invitations in regional scripts to precise seating charts—is handled with the utmost respect and organization. Our platform is built for the complexity of large, multi-day ceremonies.
                        </p>
                    </motion.div>
                    <motion.div variants={itemRight} className="p-4 rounded-xl shadow-2xl border-4 border-amber-500 bg-white">
                        <div className="flex items-center justify-center">
                            <ResponsiveImageContainer
                                src={MarriageGIF}
                                alt="Elegant Ceremony Planning GIF"
                                isPlaceholder={false}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* FEATURE BLOCK 2: CORPORATE CONFERENCES (GIF LEFT / TEXT RIGHT) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-24">
                    <motion.div variants={item} className="order-2 md:order-1 p-4 rounded-xl shadow-2xl border-4 border-indigo-600 bg-white">
                        <div className="flex items-center justify-center">
                            <ResponsiveImageContainer
                                src={ConferenceGIF}
                                alt="Real-time RSVP Dashboard Analytics GIF"
                                isPlaceholder={false}
                            />
                        </div>
                    </motion.div>
                    <motion.div variants={itemRight} className="order-1 md:order-2 text-center md:text-left p-4">
                        <CorporateIcon className="w-12 h-12 mb-4 text-indigo-600 mx-auto md:mx-0" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Conferences & Business Summits</h3>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Power your business events with real-time analytics. Our RSVP dashboard provides live attendee status, dietary restrictions, and professional communication tools for flawless corporate event execution.
                        </p>
                    </motion.div>
                </div>

                {/* FEATURE BLOCK 3: COMMUNITY & CULTURAL GATHERINGS (TEXT LEFT / GIF RIGHT) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <motion.div variants={item} className="text-center md:text-left p-4">
                        <CulturalIcon className="w-12 h-12 mb-4 text-amber-500 mx-auto md:mx-0" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Community & Local Gatherings</h3>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            From festivals to neighborhood potlucks, VEDIKA simplifies public and private events. Use our location mapping for local venues and the integrated discussion forum to foster true community spirit.
                        </p>
                    </motion.div>
                    <motion.div variants={itemRight} className="p-4 rounded-xl shadow-2xl border-4 border-rose-500 bg-white">
                        <div className="flex items-center justify-center">
                            <ResponsiveImageContainer
                                src={CommunityGIF}
                                alt="Map Integration & Discussion Forum GIF"
                                isPlaceholder={false}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. FINAL CTA SECTION */}
            <section className="py-16 md:py-24 text-center">
                <motion.h2 variants={item} className="text-4xl md:text-6xl font-extrabold text-gray-900">
                    Ready to Present Your Masterpiece?
                </motion.h2>
                <motion.div variants={item} className="mt-10">
                    <Link to="/auth">
                        {/* Primary Button */}
                        <Button variant="primary" className="text-xl px-12 py-4 shadow-2xl transition-all duration-500 hover:scale-105">
                            Enter the VEDIKA Stage
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t mt-20 text-center text-gray-500 text-sm bg-white shadow-inner mx-[-1rem] md:mx-[-1.5rem] lg:mx-[-2rem] px-4 sm:px-6 lg:px-8">
                © {new Date().getFullYear()} VEDIKA - Event Management Platform. All rights reserved.
            </footer>
        </motion.div>
    );
};


export default LandingPage;