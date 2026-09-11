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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
              {/* Gross Revenue */}
              <div style={{ background: "#121212", color: "#fff", borderRadius: 14, padding: "20px 22px", border: "1px solid #1E293B", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Satoshi, sans-serif" }}>
                    Total Gross Revenue
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path opacity="0.4" d="M21 7H3C2.45 7 2 7.45 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 7.45 21.55 7 21 7Z" fill="#94A3B8"/>
                    <path d="M16 3H8C6.9 3 6 3.9 6 5V7H18V5C18 3.9 17.1 3 16 3Z" fill="#94A3B8"/>
                    <circle cx="16.5" cy="13.5" r="1.5" fill="#121212"/>
                  </svg>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
                  ₦{stats.totalRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#38BDF8", fontWeight: 600 }}>Avg Order Value:</span>
                  <span>₦{Math.round(stats.avgOrderValue).toLocaleString()}</span>
                </div>
              </div>

              {/* Paid Revenue */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Satoshi, sans-serif" }}>
                    Paid Revenue
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" opacity="0.15" fill="#036B26"/>
                    <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#036B26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#036B26", fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
                  ₦{stats.paidAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 8, fontWeight: 500 }}>
                  {stats.completedOrders} completed orders
                </div>
              </div>

              {/* Outstanding Balance */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Satoshi, sans-serif" }}>
                    Outstanding Balance
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" opacity="0.15" fill="#D97706"/>
                    <path d="M12 7V12L15.5 14" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#D97706", fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
                  ₦{stats.unpaidAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 8, fontWeight: 500 }}>
                  {stats.pendingOrders} pending / in-progress
                </div>
              </div>

              {/* Active Clients */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Satoshi, sans-serif" }}>
                    Active Clients
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path opacity="0.4" d="M10.1 13.225C10.0333 13.2167 9.95833 13.2167 9.88333 13.225C8.35 13.175 7.125 11.9167 7.125 10.3667C7.125 8.78334 8.4 7.5 9.99167 7.5C11.575 7.5 12.8583 8.78334 12.8583 10.3667C12.8583 11.9167 11.6417 13.175 10.1 13.225Z" fill="#121212" />
                    <path d="M7.39166 14.9502C6.13333 15.7919 6.13333 17.1752 7.39166 18.0085C8.825 18.9669 11.175 18.9669 12.6083 18.0085C13.8667 17.1669 13.8667 15.7835 12.6083 14.9502C11.1833 13.9919 8.83333 13.9919 7.39166 14.9502Z" fill="#121212" />
                  </svg>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
                  {clientsCount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 8, fontWeight: 500 }}>
                  Total registered profiles
                </div>
              </div>
            </div>

            {/* Detailed Analytics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Garment Popularity */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21.6699 6.9499C21.0299 4.7799 19.2199 2.9699 17.0499 2.3299C15.3999 1.8499 14.2599 1.8899 13.4699 2.4799C12.5199 3.1899 12.4099 4.4699 12.4099 5.3799V7.8699C12.4099 10.3299 13.5299 11.5799 15.7299 11.5799H18.5999C19.4999 11.5799 20.7899 11.4699 21.4999 10.5199C22.1099 9.7399 22.1599 8.5999 21.6699 6.9499Z" fill="#E57301"/>
                    <path opacity="0.4" d="M18.9101 13.3597C18.6501 13.0597 18.2701 12.8897 17.8801 12.8897H14.3001C12.5401 12.8897 11.1101 11.4597 11.1101 9.69966V6.11966C11.1101 5.72966 10.9401 5.34966 10.6401 5.08966C10.3501 4.82966 9.95014 4.70966 9.57014 4.75966C7.22014 5.05966 5.06014 6.34966 3.65014 8.28966C2.23014 10.2397 1.71014 12.6197 2.16014 14.9997C2.81014 18.4397 5.56014 21.1897 9.01014 21.8397C9.56014 21.9497 10.1101 21.9997 10.6601 21.9997C12.4701 21.9997 14.2201 21.4397 15.7101 20.3497C17.6501 18.9397 18.9401 16.7797 19.2401 14.4297C19.2901 14.0397 19.1701 13.6497 18.9101 13.3597Z" fill="#E57301"/>
                  </svg>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A", fontFamily: "Sora, sans-serif" }}>
                    Top Garment Categories
                  </h3>
                </div>
                {topOutfits.length === 0 ? (
                  <div style={{ color: "#94A3B8", fontSize: 14 }}>No order data available yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {topOutfits.map(([outfit, count]) => {
                      const pct = Math.round((count / (stats.totalOrders || 1)) * 100);
                      return (
                        <div key={outfit} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: "#334155" }}>
                            <span>{outfit}</span>
                            <span style={{ color: "#64748B", fontWeight: 500 }}>{count} {count === 1 ? "order" : "orders"} ({pct}%)</span>
                          </div>
                          <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: "#E57301", borderRadius: 3 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Production & Financial Efficiency */}
              <div style={{ background: "#fff", border: "1px solid #E2E4E9", borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" opacity="0.2" fill="#0284C7"/>
                    <circle cx="12" cy="12" r="5" stroke="#0284C7" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="1.5" fill="#0284C7"/>
                  </svg>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A", fontFamily: "Sora, sans-serif" }}>
                    Fulfillment & Collection Rate
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Completion Rate</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#036B26", fontFamily: "Sora, sans-serif" }}>
                      {Math.round((stats.completedOrders / (stats.totalOrders || 1)) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Payment Collection Rate</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0284C7", fontFamily: "Sora, sans-serif" }}>
                      {Math.round((stats.paidAmount / (stats.totalRevenue || 1)) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Total Orders Processed</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", fontFamily: "Sora, sans-serif" }}>
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
