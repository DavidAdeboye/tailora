"use client";

import { useAppModals } from "./AppModalsContext";
import AppPageHeader from "./AppPageHeader";
import { AppPageBody, PageSectionHeader } from "./AppPageBody";
import PrimaryButton from "./PrimaryButton";

const clients = [
  { id: "#28373", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", orders: 3 },
  { id: "#32876", name: "Adaobi Nwosu", phone: "+234 **** 8821 ****", gender: "Female", outfit: "Suit", orders: 1 },
  { id: "#11394", name: "Chidi Okafor", phone: "+234 **** 4412 ****", gender: "Male", outfit: "Senator", orders: 2 },
  { id: "#99822", name: "Fatima Bello", phone: "+234 **** 9901 ****", gender: "Female", outfit: "Agbada", orders: 1 },
];

function AddIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M12.1425 1.5H5.8575C3.1275 1.5 1.5 3.1275 1.5 5.8575V12.135C1.5 14.8725 3.1275 16.5 5.8575 16.5H12.135C14.865 16.5 16.4925 14.8725 16.4925 12.1425V5.8575C16.5 3.1275 14.8725 1.5 12.1425 1.5Z" fill="white" />
      <path d="M13.5 8.4375H9.5625V4.5C9.5625 4.1925 9.3075 3.9375 9 3.9375C8.6925 3.9375 8.4375 4.1925 8.4375 4.5V8.4375H4.5C4.1925 8.4375 3.9375 8.6925 3.9375 9C3.9375 9.3075 4.1925 9.5625 4.5 9.5625H8.4375V13.5C8.4375 13.8075 8.6925 14.0625 9 14.0625C9.3075 14.0625 9.5625 13.8075 9.5625 13.5V9.5625H13.5C13.8075 9.5625 14.0625 9.3075 14.0625 9C14.0625 8.6925 13.8075 8.4375 13.5 8.4375Z" fill="white" />
    </svg>
  );
}

export default function ClientManagementPage() {
  const { openAddClient } = useAppModals();

  return (
    <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
      <AppPageHeader title="Client Management" />
      <AppPageBody>
        <PageSectionHeader
          title="All Clients"
          subtitle="View and manage every client in your atelier"
          action={
            <PrimaryButton onClick={() => openAddClient()}>
              <AddIcon />
              Add Client
            </PrimaryButton>
          }
        />

        <div className="tailora-data-panel">
          <div className="tailora-m-cards">
            {clients.map((c) => (
              <div key={c.id} className="tailora-m-card">
                <div className="tailora-m-card-top">
                  <span className="tailora-m-card-id">{c.id}</span>
                  <span className="tailora-m-card-badge">{c.orders} orders</span>
                </div>
                <div className="tailora-m-card-title">{c.name}</div>
                <div className="tailora-m-card-meta">
                  <span>{c.phone}</span>
                  <span>{c.gender} · {c.outfit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tailora-data-table-desktop tailora-table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F8F8" }}>
                  {["ID", "Client Name", "Phone", "Gender", "Outfit Type", "Orders"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#344054",
                        borderBottom: "1px solid #E4E7EC",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{c.id}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#101928" }}>{c.name}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{c.phone}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{c.gender}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{c.outfit}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{c.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppPageBody>
    </div>
  );
}
