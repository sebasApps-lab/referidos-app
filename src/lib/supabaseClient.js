import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mqgkukbognykqlwxmbli.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZ2t1a2JvZ255a3Fsd3htYmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MDUzOTMsImV4cCI6MjA3OTQ4MTM5M30.T3WcecW_0ag70NrQTbFYF2V2TwXOsoWNpQ5YZNQ5uW0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
