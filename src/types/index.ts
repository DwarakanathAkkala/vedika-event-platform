// 1. AUTHENTICATION / USER TYPES (Essential for the next task)
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    // Metadata for the app
    isNewUser: boolean;
    hasCompletedOnboarding: boolean;
    eventHistory: string[]; // Array of event IDs created or attended
}

// 2. EVENT TYPES
export type RSVPStatus = 'ATTENDING' | 'NOT_ATTENDING' | 'MAYBE' | 'NO_RESPONSE';
export type EventType = 'PUBLIC' | 'PRIVATE' | 'INVITE_ONLY';

export interface Location {
    address: string;
    lat: number;
    lng: number;
    placeId?: string; // Google Place ID (for Map Integration)
}

export interface Media {
    url: string;
    type: 'image' | 'video';
    thumbnailUrl?: string;
    caption?: string;
}

export interface Event {
    id: string;
    creatorId: string; // User.uid
    title: string;
    description: string;
    startDate: string; // ISO 8601 string
    endDate: string;   // ISO 8601 string
    location: Location;
    type: EventType;
    media: Media[];
    isDraft: boolean;
    createdAt: number; // Timestamp
    updatedAt: number; // Timestamp
}

// 3. RSVP/ATTENDEE TYPES
export interface RSVP {
    userId: string;
    eventId: string;
    status: RSVPStatus;
    comment?: string;
    respondedAt: number;
}