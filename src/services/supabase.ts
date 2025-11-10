// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Get the Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log a fatal error if the keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("FATAL ERROR: Supabase URL or Anon Key is missing. Check your .env.local file.");
}

// Create and export the Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);