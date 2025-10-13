// Supabase Client for React Native/Expo
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase configuration from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://sfhkchooqiqyzrwkvziz.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmaGtjaG9vcWlxeXpyd2t2eml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDA4MDYsImV4cCI6MjA3NTY3NjgwNn0.ZIc8weSMSeN51M2vUpnHsKs_q-XdPkkfHgWUE6ipBeg';

// Initialize Supabase client with AsyncStorage for persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Enable to handle OAuth callbacks
  },
});

console.log('🚀 Supabase initialized');

// Export for use in other parts of the app
export default supabase;
