// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bjiweypqxmszhvumvwdk.supabase.co'; // reemplazar
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaXdleXBxeG1zemh2dW12d2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzQwMjUsImV4cCI6MjA2ODA1MDAyNX0.Y3bin1MP5p2gwLS2Slo_K1Np_NazMIyDlAgn2DHV-k4';         // reemplazar

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
