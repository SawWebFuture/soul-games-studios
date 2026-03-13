import { NextResponse } from 'next/server';
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabase/env';

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
      { status: 500 },
    );
  }

  const res = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: supabaseAnonKey,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json(
      {
        ok: false,
        status: res.status,
        error: body.slice(0, 300),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
