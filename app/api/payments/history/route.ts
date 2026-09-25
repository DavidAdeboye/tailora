import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("sb-access-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
    }

    // Use service client to query payment_transactions strictly for this user
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: transactions, error: txErr } = await supabaseService
      .from("payment_transactions")
      .select("id, tx_ref, flw_ref, amount, currency, status, payment_plan, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (txErr) {
      console.error("[/api/payments/history] query error:", txErr);
      return NextResponse.json({ error: "Failed to fetch payment history" }, { status: 500 });
    }

    // Filter to strictly show user's valid transactions (successful or failed, ignore abandoned pending clicks)
    const filtered = (transactions || []).filter(
      (tx) => tx.status === "successful" || tx.status === "failed"
    );

    return NextResponse.json({ transactions: filtered });
  } catch (err: any) {
    console.error("[/api/payments/history] unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
