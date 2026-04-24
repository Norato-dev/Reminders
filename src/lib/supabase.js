import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Sign in anonymously if there is no active session.
// Supabase persists the session in localStorage so the same
// user_id is reused on every subsequent visit from the same device.
supabase.auth.getSession().then(({ data: { session } }) => {
  if (!session) supabase.auth.signInAnonymously();
});
