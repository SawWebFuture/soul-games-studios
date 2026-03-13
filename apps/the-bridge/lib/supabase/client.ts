import { createClient } from '@supabase/supabase-js';
import { assertSupabaseEnv, supabaseAnonKey, supabaseUrl } from './env';

assertSupabaseEnv();

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
