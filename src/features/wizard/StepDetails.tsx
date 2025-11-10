// src/features/wizard/StepDetails.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardContext';
import type { EventType } from '../../types';

// Available Event Types for the UI
const EVENT_TYPES: EventType[] = ['PUBLIC', 'PRIVATE', 'INVITE_ONLY'];

const StepDetails: React.FC = () => {
    const { eventData, updateEventData } = useWizard();

    // ... (State declarations remain) ...
    const [title, setTitle] = useState(eventData.title || '');
    const [description, setDescription] = useState(eventData.description || '');
    const [startDate, setStartDate] = useState(eventData.startDate ? eventData.startDate.substring(0, 16) : new Date().toISOString().substring(0, 16));
    const [eventType, setEventType] = useState<EventType>(eventData.type || 'PUBLIC');


    // Centralized handler to push all local state changes to the context
    const handleDataChange = (
        newTitle: string,
        newDescription: string,
        newStartDate: string,
        newEventType: EventType
    ) => {
        updateEventData({
            title: newTitle,
            description: newDescription,
            startDate: newStartDate,
            endDate: newStartDate,
            type: newEventType,
            updatedAt: Date.now(),
        });
    };

    // Individual change handlers calling the centralized logic
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        handleDataChange(newTitle, description, startDate, eventType);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        handleDataChange(title, newDescription, startDate, eventType);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setStartDate(newDate);
        handleDataChange(title, description, newDate, eventType);
    };

    const handleEventTypeChange = (type: EventType) => {
        setEventType(type);
        handleDataChange(title, description, startDate, type);
    };


    return (
        <motion.div // Removed <form> tag
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Event Information</h2>

            {/* Title Input */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Event Title*</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="E.g., Grand Telugu Wedding Ceremony"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                    required
                />
            </div>

            {/* Description Textarea */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={4}
                    placeholder="Tell your guests what this event is about..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 resize-none"
                    required
                />
            </div>

            {/* Date/Time Picker */}
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Date & Time*</label>
                <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                    required
                />
            </div>

            {/* Event Type Radio Buttons */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <div className="flex space-x-4">
                    {EVENT_TYPES.map(type => (
                        <label key={type} className="flex items-center text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="eventType"
                                value={type}
                                checked={eventType === type}
                                onChange={() => handleEventTypeChange(type)}
                                className="mr-2 rounded text-indigo-600 focus:ring-indigo-600"
                            />
                            {type.replace('_', ' ')}
                        </label>
                    ))}
                </div>
            </div>

            {/* REMOVED NEXT BUTTON */}

        </motion.div>
    );
};

export default StepDetails;