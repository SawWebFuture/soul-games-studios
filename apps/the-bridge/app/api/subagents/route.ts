import { NextResponse } from 'next/server';
import { getSubagentStore } from '@/lib/subagents-repo';

export async function GET() {
  try {
    const store = await getSubagentStore();
    return NextResponse.json(store);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
