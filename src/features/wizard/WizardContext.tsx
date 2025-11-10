// src/features/wizard/WizardContext.tsx - FINAL INITIALIZATION FIX
import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Event } from '../../types';

// 1. Define Step Names
export const WIZARD_STEPS = [
    'DETAILS',
    'LOCATION',
    'INVITEES',
    'MEDIA',
    'REVIEW'
] as const;
export type WizardStep = typeof WIZARD_STEPS[number];

// 2. Define Context Shape
interface WizardContextType {
    currentStep: WizardStep;
    stepIndex: number;
    totalSteps: number;
    goToNextStep: () => void;
    goToPrevStep: () => void;
    updateEventData: (data: Partial<Event>) => void;
    eventData: Partial<Event>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

interface WizardProviderProps {
    children: React.ReactNode;
}

// 💥 CRITICAL FIX: Ensure all required fields have an initial, non-null value 💥
const initialEventData: Partial<Event> = {
    // Basic Details
    title: '', // MUST be a string
    description: '', // MUST be a string
    type: 'PUBLIC',
    isDraft: true,

    // Dates (using empty string or current ISO string)
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),

    // Location Details
    location: { address: '', lat: 0, lng: 0, placeId: '' }, // Ensure location has string defaults

    // Media & Metadata
    media: [],
    creatorId: '',
    id: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
};

export const WizardProvider: React.FC<WizardProviderProps> = ({ children }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [eventData, setEventData] = useState<Partial<Event>>(initialEventData);

    const currentStep = WIZARD_STEPS[stepIndex];
    const totalSteps = WIZARD_STEPS.length;

    const goToNextStep = () => {
        if (stepIndex < totalSteps - 1) {
            setStepIndex(stepIndex + 1);
        }
    };

    const goToPrevStep = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    const updateEventData = (data: Partial<Event>) => {
        setEventData((prev) => ({ ...prev, ...data }));
    };


    const value = useMemo(() => ({
        currentStep,
        stepIndex,
        totalSteps,
        goToNextStep,
        goToPrevStep,
        updateEventData,
        eventData,
    }), [currentStep, stepIndex, totalSteps, eventData]);

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};