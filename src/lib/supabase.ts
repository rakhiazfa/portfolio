import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Cookie-less anon client: keeps public pages statically renderable; RLS limits it to published rows.
// Responses land in Next's data cache: admin saves purge it instantly, direct DB edits (SQL editor) show within an hour.
export const publicDb = () =>
  createClient(url, publishableKey, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 3600 } }) },
  });

// Session-aware client for the admin area.
export async function sessionDb() {
  const store = await cookies();
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // called from a Server Component; proxy.ts refreshes the session instead
        }
      },
    },
  });
}

// Service role: bypasses RLS. Server-only (contact form inserts).
export const serviceDb = () =>
  createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

export const storageUrl = (bucket: string, path: string) =>
  `${url}/storage/v1/object/public/${bucket}/${path}`;
