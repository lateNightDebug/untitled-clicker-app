// Supabase auth file
// ─────────────────────────────────────────────────────────────────────────────
//
// The URL and anon key come from environment variables (.env file, gitignored).
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Week 12 - Class Code
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,  // persist session across app restarts
    autoRefreshToken: true, // silently refresh JWTs before they expire
    persistSession: true,   // save session to AsyncStorage on sign in
    detectSessionInUrl: false, // disable browser URL parsing (not a web app)
  },
});
