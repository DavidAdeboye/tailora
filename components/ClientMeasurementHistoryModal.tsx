"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface MeasurementRecord {
  id: string;
  created_at: string;
  unit: string;
  neck?: string;
  chestBust?: string;
  waist?: string;
  hip?: string;
  shoulder?: string;
  sleeve?: string;
  trouserLength?: string;
  customFields?: Array<{ name: string; value: string }>;
  notes?: string;
}

interface Props {
  isOpen: boolean;
  client: { id: string; name: string; phone?: string; outfitType?: string } | null;
  onClose: () => void;
  onTakeNew: () => void;
  onEditRecord: (record: MeasurementRecord) => void;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export default function ClientMeasurementHistoryModal({
  isOpen,
  client,
  onClose,
  onTakeNew,
  onEditRecord,
}: Props) {
  const [records, setRecords] = useState<MeasurementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !client?.id) return;
    let mounted = true;

    async function loadHistory() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, measurements, notes")
          .eq("client_id", client!.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching measurement history:", error);
          return;
        }

        if (mounted && data) {
          const parsed: MeasurementRecord[] = data
            .filter((o: any) => o.measurements)
            .map((o: any) => {
              const m = o.measurements || {};
              return {
                id: o.id,
                created_at: o.created_at,
                unit: m.unit || "in",
                neck: m.neck || m.Neck || "",
                chestBust: m.chestBust || m.chest || m.Chest || "",
                waist: m.waist || m.Waist || "",
                hip: m.hip || m.Hip || "",
                shoulder: m.shoulder || m.Shoulder || "",
                sleeve: m.sleeve || m.Sleeve || "",
                trouserLength: m.trouserLength || m.inseam || m.TrouserLength || "",
                customFields: m.customFields || [],
                notes: o.notes || m.notes || "",
              };
            });
          setRecords(parsed);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadHistory();
    return () => {
      mounted = false;
    };
  }, [isOpen, client?.id]);

  if (!isOpen || !client) return null;

  return (
    <div
      className="tailora-modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,13,18,0.70)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="tailora-modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: 580,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          fontFamily: "Satoshi, Inter, sans-serif",
        }}
      >
        {/* Header decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 140,
            background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#F5F7F8",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ padding: "32px 28px 28px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: "#1A1A1A" }}>
                Measurement History
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: "#696969" }}>
                {client.name} {client.phone ? `· ${client.phone}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={onTakeNew}
              style={{
                padding: "8px 16px",
                background: "#121212",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Record New
            </button>
          </div>

          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 20 }} />

          {isLoading ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#666" }}>Loading history…</div>
          ) : records.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", background: "#F9FAFB", borderRadius: 12 }}>
              <p style={{ margin: "0 0 12px", fontSize: 14, color: "#475467" }}>No past measurement records found for this client.</p>
              <button
                type="button"
                onClick={onTakeNew}
                style={{
                  padding: "10px 20px",
                  background: "#EB5017",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Take Measurements
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {records.map((rec, index) => {
                const u = rec.unit === "centimetres" || rec.unit === "cm" ? "cm" : "in";
                return (
                  <div
                    key={rec.id}
                    style={{
                      border: index === 0 ? "2px solid #EB5017" : "1px solid #EAECF0",
                      borderRadius: 12,
                      padding: 16,
                      background: index === 0 ? "#FFFBF9" : "#FFFFFF",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#101928" }}>
                          {formatDate(rec.created_at)}
                        </span>
                        {index === 0 && (
                          <span style={{ background: "#EB5017", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                            Most Recent
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: "#667185", background: "#F2F4F7", padding: "2px 6px", borderRadius: 4 }}>
                          Unit: {u}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onEditRecord(rec)}
                        style={{
                          padding: "4px 12px",
                          background: "#fff",
                          border: "1px solid #D0D5DD",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#344054",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    </div>

                    {/* Measurements grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px 12px", fontSize: 13 }}>
                      {rec.neck && <div><span style={{ color: "#667185" }}>Neck:</span> <strong>{rec.neck} {u}</strong></div>}
                      {rec.chestBust && <div><span style={{ color: "#667185" }}>Chest/Bust:</span> <strong>{rec.chestBust} {u}</strong></div>}
                      {rec.waist && <div><span style={{ color: "#667185" }}>Waist:</span> <strong>{rec.waist} {u}</strong></div>}
                      {rec.hip && <div><span style={{ color: "#667185" }}>Hip:</span> <strong>{rec.hip} {u}</strong></div>}
                      {rec.shoulder && <div><span style={{ color: "#667185" }}>Shoulder:</span> <strong>{rec.shoulder} {u}</strong></div>}
                      {rec.sleeve && <div><span style={{ color: "#667185" }}>Sleeve:</span> <strong>{rec.sleeve} {u}</strong></div>}
                      {rec.trouserLength && <div><span style={{ color: "#667185" }}>Trouser:</span> <strong>{rec.trouserLength} {u}</strong></div>}
                      {rec.customFields && rec.customFields.map((cf, i) => (
                        <div key={i}><span style={{ color: "#667185" }}>{cf.name}:</span> <strong>{cf.value} {u}</strong></div>
                      ))}
                    </div>

                    {rec.notes && (
                      <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #EAECF0", fontSize: 13, color: "#475467" }}>
                        <strong>Note:</strong> {rec.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
