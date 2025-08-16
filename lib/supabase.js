// lib/supabase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const auth = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
};

// Solo en iOS/Android uso AsyncStorage.
// En web/SSR dejo que supabase use localStorage/memoria.
if (Platform.OS !== 'web') {
  auth.storage = AsyncStorage;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth });
