// src/features/wizard/StepInvitees.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardContext';
import toast from 'react-hot-toast';

// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StepInvitees: React.FC = () => {
    const { eventData, updateEventData } = useWizard();

    // We will need to add an 'invitees' property to our Event type
    const [invitees, setInvitees] = useState<string[]>(eventData.invitees || []);
    const [currentEmail, setCurrentEmail] = useState('');

    const handleAddInvitee = () => {
        const trimmedEmail = currentEmail.trim();

        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (invitees.includes(trimmedEmail)) {
            toast.error("This email has already been added.");
            return;
        }

        const newInvitees = [...invitees, trimmedEmail];
        setInvitees(newInvitees);
        updateEventData({ invitees: newInvitees });
        setCurrentEmail(''); // Clear the input field
    };

    const handleRemoveInvitee = (emailToRemove: string) => {
        const newInvitees = invitees.filter(email => email !== emailToRemove);
        setInvitees(newInvitees);
        updateEventData({ invitees: newInvitees });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow adding with Enter or comma key
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddInvitee();
        }
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Invite Guests</h2>
            <p className="text-sm text-gray-500">Add guests by email. You can add more later from the event page. (This step is optional).</p>

            {/* Input for adding invitees */}
            <div className="flex items-center space-x-2">
                <input
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter an email address..."
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                />
                <button
                    type="button"
                    onClick={handleAddInvitee}
                    className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add
                </button>
            </div>

            {/* List of Added Invitees */}
            {invitees.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border max-h-64 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Guest List ({invitees.length})</h3>
                    <div className="space-y-2">
                        {invitees.map(email => (
                            <motion.div
                                key={email}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
                            >
                                <span className="text-sm text-gray-700">{email}</span>
                                <button
                                    onClick={() => handleRemoveInvitee(email)}
                                    className="p-1 rounded-full text-red-500 hover:bg-red-100"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

        </motion.div>
    );
};

export default StepInvitees;