import { NextRequest, NextResponse } from 'next/server';

/**
 * Cron Job — Runs periodically (e.g., daily or hourly).
 * Triggers status evaluation and emails for uncollected orders.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[cron/evaluate-orders] Unauthorized request rejected');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const origin = req.nextUrl.origin;
  try {
    const evalRes = await fetch(`${origin}/api/orders/evaluate-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await evalRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[cron/evaluate-orders] Error triggering evaluation:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
