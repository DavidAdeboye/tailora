import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { FLW_BASE, FLW_HEADERS, PRICING_TIERS, makeTxRef } from "../../../../lib/flutterwave";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/payments/initialize
 *
 * Body: { userId, email, planTier }
 *
 * Creates a Flutterwave Standard payment link for the chosen plan.
 * Logs a "pending" transaction row in `payment_transactions`.
 *
 * Returns: { link: "https://checkout.flutterwave.com/…" }
 */
export async function POST(req: Request) {
  try {
    const { userId, email, planTier } = await req.json();

    // ── Validate ──
    const tier = PRICING_TIERS[planTier];
    if (!tier) {
      return NextResponse.json(
        { error: `Unknown plan tier: ${planTier}` },
        { status: 400 }
      );
    }

    if (!userId || !email) {
      return NextResponse.json(
        { error: "userId and email are required" },
        { status: 400 }
      );
    }

    // ── Check if user is a team member in another workspace ──
    const cleanEmail = email.trim().toLowerCase();
    const { data: memberRows } = await supabase
      .from('team_members')
      .select('id, user_id, role, status')
      .eq('email', cleanEmail)
      .eq('status', 'Active');

    if (memberRows && memberRows.length > 0) {
      const isCoWorker = memberRows.some(m => m.user_id !== userId);
      if (isCoWorker) {
        return NextResponse.json(
          { error: 'Only the Workspace Owner can purchase or manage subscription plans. Please contact your workspace owner to upgrade.' },
          { status: 403 }
        );
      }
    }

    const tx_ref = makeTxRef(userId);

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
    const appOrigin = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");

    // ── Create Flutterwave checkout session ──
    const flwRes = await fetch(`${FLW_BASE}/payments`, {
      method: "POST",
      headers: FLW_HEADERS,
      body: JSON.stringify({
        tx_ref,
        amount: tier.amount,
        currency: tier.currency,
        redirect_url: `${appOrigin}/api/payments/verify`,
        customer: { email },
        customizations: {
          title: `Tailora ${tier.name} Plan`,
          description: `Monthly subscription — ${tier.name}`,
          logo: `${appOrigin}/lgog2.png`,
        },
        meta: {
          user_id: userId,
          plan_tier: planTier,
        },
      }),
    });

    const data = await flwRes.json();

    if (data.status !== "success") {
      console.error("[FLW init error]", data);
      return NextResponse.json(
        { error: data.message || "Flutterwave initialisation failed" },
        { status: 502 }
      );
    }

    // ── Log pending transaction ──
    await supabase.from("payment_transactions").insert({
      user_id: userId,
      tx_ref,
      amount: tier.amount,
      currency: tier.currency,
      status: "pending",
      payment_plan: planTier,
    });

    return NextResponse.json({ link: data.data.link });
  } catch (err: any) {
    console.error("[/api/payments/initialize]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
