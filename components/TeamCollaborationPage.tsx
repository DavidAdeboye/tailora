"use client";

import { useAppModals } from "./AppModalsContext";
import AppPageHeader from "./AppPageHeader";
import { AppPageBody, PageSectionHeader } from "./AppPageBody";
import PrimaryButton from "./PrimaryButton";

const members = [
  { name: "Joshua Adeyemi", email: "joshua@couture.com", role: "Admin", status: "Active" as const },
  { name: "Amara Okonkwo", email: "amara@couture.com", role: "Tailor", status: "Active" as const },
  { name: "Emeka Diallo", email: "emeka@couture.com", role: "Assistant", status: "Pending" as const },
];

const statusStyle = {
  Active: { bg: "#E7F6EC", color: "#036B26" },
  Pending: { bg: "#FEF6E7", color: "#865503" },
};

export default function TeamCollaborationPage() {
  const { openInviteCoworker } = useAppModals();

  return (
    <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
      <AppPageHeader title="Team Collaboration" />
      <AppPageBody>
        <PageSectionHeader
          title="Your Team"
          subtitle="Invite co-workers and assign roles across your workshop"
          action={<PrimaryButton onClick={() => openInviteCoworker()}>Invite Member</PrimaryButton>}
        />

        <div className="tailora-data-panel">
          <div className="tailora-m-cards">
            {members.map((m) => {
              const st = statusStyle[m.status];
              return (
                <div key={m.email} className="tailora-m-card">
                  <div className="tailora-m-card-top">
                    <span className="tailora-m-card-role">{m.role}</span>
                    <span className="tailora-m-card-pill" style={{ background: st.bg, color: st.color }}>
                      {m.status}
                    </span>
                  </div>
                  <div className="tailora-m-card-title">{m.name}</div>
                  <div className="tailora-m-card-meta">
                    <span>{m.email}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tailora-data-table-desktop tailora-table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F8F8" }}>
                  {["Name", "Email", "Role", "Status"].map((h) => (
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
                {members.map((m) => {
                  const st = statusStyle[m.status];
                  return (
                    <tr key={m.email} style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#101928" }}>{m.name}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{m.email}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{m.role}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 500,
                            background: st.bg,
                            color: st.color,
                          }}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AppPageBody>
    </div>
  );
}
