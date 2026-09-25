import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/webhooks/flutterwave
 *
 * Flutterwave sends async events here (e.g. charge.completed,
 * subscription.cancelled).  Authenticated via the verif-hash header.
 *
 * IMPORTANT — Set your webhook URL + secret hash in the
 * Flutterwave dashboard → Settings → Webhooks.
 */
export async function POST(req: Request) {
  // ── Verify webhook signature ──
  const signature = req.headers.get("verif-hash");
  if (!signature || signature !== process.env.FLUTTERWAVE_WEBHOOK_HASH) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 401 }
    );
  }

  try {
    const payload = await req.json();
    const event = payload.event as string;
    const data = payload.data;

    // ── charge.completed — successful payment ──
    if (event === "charge.completed" && data?.status === "successful") {
      const userId = data.meta?.user_id;
      const planTier = data.meta?.plan_tier;

      if (userId && planTier) {
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

        // Update matching transaction row
        if (data.tx_ref) {
          await supabase
            .from("payment_transactions")
            .update({
              status: "successful",
              flw_ref: data.flw_ref,
            })
            .eq("tx_ref", data.tx_ref);
        }
      }
    }

    // ── subscription.cancelled ──
    if (event === "subscription.cancelled") {
      const customerEmail = data?.customer?.email;
      if (customerEmail) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "cancelled",
          })
          .eq("email", customerEmail);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("[FLW webhook error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
