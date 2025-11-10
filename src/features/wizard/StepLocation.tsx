// src/features/wizard/StepLocation.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardContext';

const StepLocation: React.FC = () => {
    const { eventData, updateEventData } = useWizard();

    // Local State for Map/Location
    const [address, setAddress] = useState(eventData.location?.address || '');
    const [mapPlaceholder, setMapPlaceholder] = useState('Search for a venue or address...');

    // Update the context on every input change
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        setMapPlaceholder(`Searching for: ${newAddress}`);

        // Update Context immediately
        updateEventData({
            location: {
                address: newAddress,
                lat: 17.3850, // Mock Latitude (will be replaced by Maps API)
                lng: 78.4867, // Mock Longitude
            },
            updatedAt: Date.now(),
        });
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Location & Venue</h2>

            {/* Location Search Input */}
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Venue Address*</label>
                <input
                    id="location"
                    type="text"
                    value={address}
                    onChange={handleLocationChange}
                    placeholder="E.g., Taj Krishna, Road No. 1, Banjara Hills, Hyderabad"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                    required
                />
            </div>

            {/* Dynamic Maps Integration Placeholder */}
            <div className="h-80 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner">
                <span className="p-4 text-center">
                    <span className="text-3xl">📍</span><br />
                    Interactive Google Map will be rendered here.
                    <br />
                    <span className="text-sm italic">{mapPlaceholder}</span>
                </span>
            </div>

            <p className="text-sm text-gray-500 pt-2">Enter an address to see a preview on the map. You can also drag the pin to set the exact location.</p>
        </motion.div>
    );
};

export default StepLocation;