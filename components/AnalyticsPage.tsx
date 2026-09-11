"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { resolveWorkspace } from "../lib/resolveWorkspace";
import AppPageHeader from "./AppPageHeader";
import { AppPageBody, PageSectionHeader } from "./AppPageBody";

interface FinancialStats {
  totalRevenue: number;
  paidAmount: number;
  unpaidAmount: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  avgOrderValue: number;
  outfitBreakdown: Record<string, number>;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    async function loadAnalyticsData() {
      try {
        const workspace = await resolveWorkspace();
        if (!workspace?.workspaceOwnerId) return;

        // Load orders for revenue & breakdown analysis
        const { data: ordersData } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", workspace.workspaceOwnerId);

        if (ordersData) setOrders(ordersData);

        // Load total clients count
        const { count } = await supabase
          .from("clients")
          .select("*", { count: "exact", head: true })
          .eq("user_id", workspace.workspaceOwnerId);

        setClientsCount(count || 0);
      } catch (err) {
        console.error("Error loading analytics data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalyticsData();
  }, []);

  const stats = useMemo<FinancialStats>(() => {
    let totalRev = 0;
    let paidAmt = 0;
    let unpaidAmt = 0;
    let completed = 0;
    let pending = 0;
    const outfitMap: Record<string, number> = {};

    orders.forEach(o => {
      const price = parseFloat(o.price || o.measurements?.price || "0") || 0;
      totalRev += price;

      const status = (o.status || o.payment_status || "due").toLowerCase();
      if (status.includes("paid") || status.includes("collected")) {
        paidAmt += price;
        completed++;
      } else {
        unpaidAmt += price;
        pending++;
      }

      const outfit = o.outfit_type || o.outfit || "Custom";
      outfitMap[outfit] = (outfitMap[outfit] || 0) + 1;
    });

    const totalCount = orders.length || 1;
    const avgVal = totalRev / totalCount;

    return {
      totalRevenue: totalRev,
      paidAmount: paidAmt,
      unpaidAmount: unpaidAmt,
      totalOrders: orders.length,
      completedOrders: completed,
      pendingOrders: pending,
      avgOrderValue: avgVal,
      outfitBreakdown: outfitMap,
    };
  }, [orders]);

  const topOutfits = useMemo(() => {
    return Object.entries(stats.outfitBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [stats.outfitBreakdown]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
      <AppPageHeader title="Analytics & Financial Reports" />
      <AppPageBody>
        <PageSectionHeader
          title="Financial Performance & Efficiency"
          subtitle="Comprehensive revenue metrics, order volumes, garment breakdowns, and fulfillment insights."
        />

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#667185" }}>Loading analytics dashboard...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1100 }}>
            {/* Top Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", color: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Total Gross Revenue
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Sora, sans-serif" }}>
                  ₦{stats.totalRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#38BDF8", marginTop: 8 }}>
                  Avg Order Value: ₦{Math.round(stats.avgOrderValue).toLocaleString()}
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Paid Revenue
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#036B26", fontFamily: "Sora, sans-serif" }}>
                  ₦{stats.paidAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#667185", marginTop: 8 }}>
                  {stats.completedOrders} completed orders
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Outstanding Balance
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#D97706", fontFamily: "Sora, sans-serif" }}>
                  ₦{stats.unpaidAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#667185", marginTop: 8 }}>
                  {stats.pendingOrders} pending / in-progress
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Active Clients
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1E293B", fontFamily: "Sora, sans-serif" }}>
                  {clientsCount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#667185", marginTop: 8 }}>
                  Total registered profiles
                </div>
              </div>
            </div>

            {/* Detailed Analytics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Garment Popularity */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1E293B", fontFamily: "Sora, sans-serif" }}>
                  Top Garment Categories
                </h3>
                {topOutfits.length === 0 ? (
                  <div style={{ color: "#94A3B8", fontSize: 14 }}>No order data available yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {topOutfits.map(([outfit, count]) => {
                      const pct = Math.round((count / (stats.totalOrders || 1)) * 100);
                      return (
                        <div key={outfit} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "#334155" }}>
                            <span>{outfit}</span>
                            <span>{count} orders ({pct}%)</span>
                          </div>
                          <div style={{ height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: "#E57301", borderRadius: 4 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Production & Financial Efficiency */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 20 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1E293B", fontFamily: "Sora, sans-serif" }}>
                  Fulfillment & Collection Rate
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Completion Rate</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#036B26" }}>
                      {Math.round((stats.completedOrders / (stats.totalOrders || 1)) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Payment Collection Rate</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0284C7" }}>
                      {Math.round((stats.paidAmount / (stats.totalRevenue || 1)) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Total Orders Processed</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#1E293B" }}>
                      {stats.totalOrders}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppPageBody>
    </div>
  );
}
