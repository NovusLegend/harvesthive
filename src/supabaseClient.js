import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ldvyjmrxvdxuosxkhnah.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdnlqbXJ4dmR4dW9zeGtobmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTM3NzEsImV4cCI6MjA3NzQ4OTc3MX0.q01ufomn1a0gwBszPqzKZ4sTopspjhnGqpGbByHhtHo';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
