// src/pages/EventCreationPage.tsx
import React, { useEffect } from 'react';
import { WizardProvider, useWizard, WIZARD_STEPS, type WizardStep } from '../features/wizard/WizardContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import StepDetails from '../features/wizard/StepDetails';
import StepLocation from '../features/wizard/StepLocation';
import StepMedia from '../features/wizard/StepMedia';
import StepInvitees from '../features/wizard/StepInvitees';
import StepReview from '../features/wizard/StepReview';

// ----------------------------------------------------------------------
// Step Components (Imports)
// ----------------------------------------------------------------------
const StepComponentMap: Record<WizardStep, React.FC> = {
    DETAILS: StepDetails,
    LOCATION: StepLocation,
    MEDIA: StepMedia,
    INVITEES: StepInvitees,
    REVIEW: StepReview,
};

const StepRenderer: React.FC = () => {
    const { currentStep } = useWizard();
    const Component = StepComponentMap[currentStep];

    return (
        <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <Component />
        </motion.div>
    );
};


// Main Wizard Component with UI
const EventCreationWizard: React.FC = () => {
    const { currentStep, stepIndex, totalSteps, goToNextStep, goToPrevStep, eventData, updateEventData } = useWizard();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const progressPercentage = ((stepIndex + 1) / totalSteps) * 100;

    // Simplified validation to ensure button enables correctly
    const isCurrentStepValid = () => {
        switch (currentStep) {
            case 'DETAILS':
                return (eventData.title ?? '').trim().length > 3 &&
                    (eventData.description ?? '').trim().length > 10 &&
                    !!eventData.startDate;
            case 'LOCATION':
                return (eventData.location?.address ?? '').trim().length > 5;
            case 'MEDIA':
            case 'INVITEES':
                // These steps are optional, so they are always "valid" to proceed from
                return true;
            case 'REVIEW':
                // Final check before publishing
                return !!eventData.title && !!eventData.location?.address && !!eventData.creatorId;
            default:
                return false;
        }
    };

    const handleNextClick = () => {
        if (!isCurrentStepValid()) {
            toast.error(`Please complete the required fields in the ${currentStep.replace('_', ' ')} step.`);
            return;
        }
        goToNextStep();
    };

    const handlePublish = () => {
        if (!isCurrentStepValid()) {
            toast.error("Review failed: Missing essential event details.");
            return;
        }
        // This is where the event data would be sent to Firestore
        console.log('Publishing Event:', eventData);
        toast.success(`Event "${eventData.title || 'Draft'}" is being published!`);
        navigate('/home');
    };

    // Effect to set the creatorId from the authenticated user
    useEffect(() => {
        if (user?.uid && !eventData.creatorId) {
            const currentTimestamp = Date.now();
            updateEventData({
                creatorId: user.uid,
                createdAt: currentTimestamp,
                updatedAt: currentTimestamp,
                id: `TEMP_${currentTimestamp}`,
            });
        }
    }, [user?.uid, eventData.creatorId, updateEventData]);

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto py-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-black text-gray-900 mb-6">New VEDIKA: Creation Wizard</h1>

            {/* 1. PROGRESS BAR */}
            <div className="mb-8 bg-gray-200 rounded-full h-2.5">
                <motion.div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            {/* 2. STEP HEADER / INDICATOR */}
            <div className="flex justify-between items-center mb-10">
                <p className="text-xl font-bold text-gray-700">
                    Step {stepIndex + 1} of {totalSteps}: {currentStep.replace('_', ' ')}
                </p>
                <div className="flex space-x-2">
                    {WIZARD_STEPS.map((step, index) => (
                        <div
                            key={step}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === stepIndex ? 'bg-indigo-600 shadow-md' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* 3. STEP CONTENT */}
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 min-h-[500px] border-t-8 border-rose-500">
                <StepRenderer />
            </div>

            {/* VISUAL CONFIRMATION OF CONTEXT DATA AT THE BOTTOM */}
            <pre className="mt-4 p-4 text-xs bg-gray-800 text-gray-200 border rounded-lg shadow-inner">
                Current Event Data (Context):
                {JSON.stringify(eventData, null, 2)}
            </pre>

            {/* 4. NAVIGATION BUTTONS (Centralized) */}
            <div className="mt-8 flex justify-between">
                <Button
                    variant="ghost"
                    onClick={goToPrevStep}
                    disabled={stepIndex === 0}
                    className="flex items-center space-x-2 text-indigo-600 hover:bg-indigo-50"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    <span>Previous</span>
                </Button>

                <Button
                    variant={stepIndex === totalSteps - 1 ? 'secondary' : 'primary'}
                    onClick={stepIndex === totalSteps - 1 ? handlePublish : handleNextClick}
                    disabled={!isCurrentStepValid()}
                    className="flex items-center space-x-2"
                >
                    <span>{stepIndex === totalSteps - 1 ? 'Publish Event' : 'Next Step'}</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
            </div>
        </motion.div>
    );
};


// Wrapper component to apply the provider
const EventCreationPage: React.FC = () => {
    return (
        <WizardProvider>
            <EventCreationWizard />
        </WizardProvider>
    );
};

export default EventCreationPage;