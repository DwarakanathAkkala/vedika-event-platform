// src/features/wizard/StepReview.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardContext';

// A simple utility component for displaying a key-value pair
const ReviewItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
    <div className="py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value || 'Not provided'}</p>
    </div>
);

const StepReview: React.FC = () => {
    const { eventData } = useWizard();

    // Format the date for better readability
    const formattedDate = eventData.startDate
        ? new Date(eventData.startDate).toLocaleString(undefined, {
            dateStyle: 'full',
            timeStyle: 'short',
        })
        : 'Not set';

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your VEDIKA Stage</h2>
            <p className="text-gray-600">Please review all the details below. If everything looks correct, you can publish your event. You can always edit these details later.</p>

            <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                {/* Event Details */}
                <ReviewItem label="Event Title" value={eventData.title} />
                <ReviewItem label="Date & Time" value={formattedDate} />
                <ReviewItem label="Location" value={eventData.location?.address} />
                <ReviewItem label="Event Type" value={eventData.type?.replace('_', ' ')} />
                <ReviewItem label="Description" value={eventData.description} />

                {/* Media Preview */}
                <div className="py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Event Banner</p>
                    {eventData.media && eventData.media.length > 0 ? (
                        <div className="mt-2 aspect-video w-full max-w-sm rounded-lg overflow-hidden border">
                            <img src={eventData.media[0].url} alt="Event Banner" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <p className="text-lg font-semibold text-gray-800">No banner uploaded</p>
                    )}
                </div>

                {/* Invitees List */}
                <div className="py-3">
                    <p className="text-sm font-medium text-gray-500">Guest List ({eventData.invitees?.length || 0})</p>
                    {eventData.invitees && eventData.invitees.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {eventData.invitees.map(email => (
                                <span key={email} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                                    {email}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg font-semibold text-gray-800">No guests invited yet</p>
                    )}
                </div>
            </div>

        </motion.div>
    );
};

export default StepReview;