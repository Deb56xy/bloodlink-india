import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const isConfigured = Boolean(
  rawUrl &&
    rawKey &&
    !rawUrl.includes("YOUR_PROJECT") &&
    !rawKey.includes("YOUR_SUPABASE_ANON_KEY") &&
    rawUrl.startsWith("http")
);

export const supabase = isConfigured ? createClient(rawUrl!, rawKey!) : null;
