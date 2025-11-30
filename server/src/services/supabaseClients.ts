import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL in env');
if (!process.env.SUPABASE_ANON_KEY) throw new Error('Missing SUPABASE_ANON_KEY in env');
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in env');

// Client used for server/admin operations (use SERVICE_ROLE only on trusted server)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Client used for regular auth flows (simulates client behavior; safe to use server-side for signIn and reset flows)
export const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
