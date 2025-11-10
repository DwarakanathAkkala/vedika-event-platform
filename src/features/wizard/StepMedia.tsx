// src/features/wizard/StepMedia.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardContext';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { supabase } from '../../services/supabase'; // Import Supabase client
import type { Media } from '../../types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const STORAGE_BUCKET = 'Vedika'; // The name of the bucket you created in Supabase

const StepMedia: React.FC = () => {
    const { eventData, updateEventData } = useWizard();
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadedMedia = useMemo(() => eventData.media || [], [eventData.media]);

    const handleFile = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const file = files[0];

        // --- File Validation ---
        if (file.size > MAX_FILE_SIZE) {
            toast.error("File is too large. Max size is 5MB.");
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast.error("Invalid file type. Only images are allowed for now.");
            return;
        }

        setUploading(true);
        const toastId = toast.loading('Uploading media...');

        try {
            const fileExtension = file.name.split('.').pop();
            // Use a combination of event ID (if available) and current time for a unique path
            const fileName = `${eventData.id || `draft_${Date.now()}`}/${Date.now()}.${fileExtension}`;

            // 💥 SUPABASE UPLOAD LOGIC 💥
            const { error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(fileName, file);

            if (error) {
                throw error; // Propagate error to the catch block
            }

            // Get the public URL of the uploaded file
            const { data: { publicUrl } } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(fileName);

            if (!publicUrl) {
                throw new Error("Could not retrieve public URL for the uploaded file.");
            }

            const newMedia: Media = {
                url: publicUrl,
                type: 'image',
                thumbnailUrl: publicUrl,
            };

            // Only allow one banner image for now, replacing the old one
            updateEventData({
                media: [newMedia], // Replace instead of append
                updatedAt: Date.now(),
            });

            toast.success('Event banner uploaded successfully!', { id: toastId });

        } catch (error: any) {
            console.error("Supabase upload failed:", error);
            toast.error(`Upload failed: ${error.message}`, { id: toastId });
        } finally {
            setUploading(false);
        }
    }, [eventData.id, updateEventData]);

    // --- Drag and Drop Handlers ---
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files); };
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { handleFile(e.target.files); };

    // --- Media Removal Handler ---
    const handleRemoveMedia = (urlToRemove: string) => {
        // NOTE: In a real app, you would also call supabase.storage.from(...).remove(...)
        const filteredMedia = uploadedMedia.filter(m => m.url !== urlToRemove);
        updateEventData({ media: filteredMedia });
        toast.success("Banner removed.");
    };

    const dropZoneClasses = isDragging
        ? 'border-indigo-600 bg-indigo-50 shadow-inner'
        : 'border-gray-300 hover:border-indigo-600 hover:bg-gray-50';

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Banner & Media</h2>

            <div
                className={`border-dashed border-2 p-10 rounded-xl transition-all duration-300 ${dropZoneClasses}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('media-upload-input')?.click()}
            >
                <input
                    type="file"
                    id="media-upload-input"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
                <div className="text-center space-y-2">
                    <p className="text-xl font-semibold text-gray-700">
                        {uploading ? 'Uploading...' : 'Drag & Drop Your Event Banner'}
                    </p>
                    <p className="text-sm text-gray-500">
                        PNG, JPG, GIF (Max 5MB)
                    </p>
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={uploading}
                        className="mt-3 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                        {uploading ? 'Processing...' : 'Browse Files'}
                    </Button>
                </div>
            </div>

            {uploadedMedia.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Uploaded Banner Preview</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {uploadedMedia.map(media => (
                            <div key={media.url} className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                <img src={media.url} alt="Event Media Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => handleRemoveMedia(media.url)}
                                    className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                    aria-label="Remove banner"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <p className="text-sm text-gray-500 pt-2">A great banner image helps your event stand out.</p>
        </motion.div>
    );
};

export default StepMedia;