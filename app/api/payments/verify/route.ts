import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { FLW_BASE, FLW_HEADERS, PRICING_TIERS } from "../../../../lib/flutterwave";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/payments/verify?status=…&tx_ref=…&transaction_id=…
 *
 * Flutterwave redirects the browser here after checkout.
 * We verify the transaction server-to-server, update the DB,
 * then redirect the user to /dashboard or back to pricing.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  const url = new URL(req.url);
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || url.host;
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");

  // ── Quick bail for cancelled / failed ──
  if (status !== "successful" || !transaction_id) {
    return NextResponse.redirect(`${baseUrl}/pricing?payment=failed`);
  }

  try {
    // ── Server-to-server verification ──
    const verifyRes = await fetch(
      `${FLW_BASE}/transactions/${transaction_id}/verify`,
      { headers: FLW_HEADERS }
    );
    const verifyData = await verifyRes.json();

    if (
      verifyData.status !== "success" ||
      verifyData.data?.status !== "successful"
    ) {
      console.error("[FLW verify fail]", verifyData);
      return NextResponse.redirect(`${baseUrl}/pricing?payment=failed`);
    }

    const userId = verifyData.data.meta?.user_id;
    const planTier = verifyData.data.meta?.plan_tier;
    const tier = PRICING_TIERS[planTier];

    // ── Cross-check amount to prevent tampering ──
    if (
      tier &&
      (verifyData.data.amount < tier.amount ||
        verifyData.data.currency !== tier.currency)
    ) {
      console.error("[FLW amount mismatch]", {
        expected: tier.amount,
        got: verifyData.data.amount,
      });
      return NextResponse.redirect(`${baseUrl}/pricing?payment=failed`);
    }

    // ── Activate subscription ──
    if (userId) {
      const periodEnd = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString();

      await supabase
        .from("profiles")
        .update({
          subscription_tier: planTier,
          subscription_status: "active",
          current_period_end: periodEnd,
        })
        .eq("id", userId);
    }

    // ── Update transaction record ──
    if (tx_ref) {
      await supabase
        .from("payment_transactions")
        .update({
          status: "successful",
          flw_ref: verifyData.data.flw_ref,
        })
        .eq("tx_ref", tx_ref);
    }

    return NextResponse.redirect(
      `${baseUrl}/dashboard?payment=success`
    );
  } catch (err: any) {
    console.error("[/api/payments/verify]", err);
    return NextResponse.redirect(`${baseUrl}/pricing?payment=failed`);
  }
}
