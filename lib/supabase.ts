// FIRST LINE GUARD: prevents this module from being imported client-side.
// If a "use client" component ever imports this file, Next.js throws a
// build-time error — keeping the service role key out of the client bundle.
import "server-only";

import { createClient } from "@supabase/supabase-js";

// Runtime guard: fail loudly if env vars are missing or misconfigured.
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
}
// Extra safety: catch the common mistake of using NEXT_PUBLIC_ on the secret key.
if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "FATAL: Service role key must NEVER use NEXT_PUBLIC_ prefix — it would leak into the client bundle"
  );
}

// Module-level singleton — safe for service role because there is no per-request
// state (no cookie reading, no user session). Created once at module load.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,     // service role never needs session storage
      autoRefreshToken: false,   // service role tokens don't expire
      detectSessionInUrl: false, // irrelevant server-side
    },
  }
);
