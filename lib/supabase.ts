import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Singleton — reuse existing instance if already created (prevents multiple GoTrueClient warnings)
const globalKey = '__supabase_singleton__'
type GlobalWithSupabase = typeof globalThis & { [globalKey]?: SupabaseClient }

const g = globalThis as GlobalWithSupabase

if (!g[globalKey]) {
  g[globalKey] = createClient(url, key, {
    auth: {
      persistSession: true,
      storageKey: 'rwk-auth',
    },
  })
}

export const supabase = g[globalKey]!
