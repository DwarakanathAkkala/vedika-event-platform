// src/types/index.ts

// 1. AUTHENTICATION / USER TYPES
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isNewUser: boolean;
    hasCompletedOnboarding: boolean;
    eventHistory: string[];
}

// 2. EVENT TYPES
export type RSVPStatus = 'ATTENDING' | 'NOT_ATTENDING' | 'MAYBE' | 'NO_RESPONSE';
export type EventType = 'PUBLIC' | 'PRIVATE' | 'INVITE_ONLY';

export interface Location {
    address: string;
    lat: number;
    lng: number;
    placeId?: string;
}

export interface Media {
    url: string;
    type: 'image' | 'video';
    thumbnailUrl?: string;
    caption?: string;
}

export interface Event {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: Location;
    type: EventType;
    media: Media[];
    invitees?: string[]; // 💥 NEW: Array of guest email addresses
    isDraft: boolean;
    createdAt: number;
    updatedAt: number;
}

// 3. RSVP/ATTENDEE TYPES
export interface RSVP {
    userId: string;
    eventId: string;
    status: RSVPStatus;
    comment?: string;
    respondedAt: number;
}