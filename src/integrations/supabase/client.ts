// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eduvdvbpwopnoxleolkb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdXZkdmJwd29wbm94bGVvbGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzgyMjMsImV4cCI6MjA2NjYxNDIyM30.roLDTCPGdIJ8eRiDLISjY6Oyn57ce2qWMj8auPr1UG8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);