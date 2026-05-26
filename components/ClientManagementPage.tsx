"use client";

import { useMemo, useState } from "react";
import { useAppModals } from "./AppModalsContext";
import AppPageHeader from "./AppPageHeader";
import { AppPageBody, PageSectionHeader } from "./AppPageBody";
import PrimaryButton from "./PrimaryButton";
import { ActionMenuButton, DeleteConfirmModal } from "./Actionmenu";

type ClientStatusType = "collected" | "overdue" | "due";

interface Client {
  id: string;
  name: string;
  phone: string;
  gender: string;
  outfit: string;
  status: string;
  statusType: ClientStatusType;
}

const initialClients: Client[] = [
  { id: "#28373", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male",   outfit: "Wedding gown", status: "Collected",      statusType: "collected" },
  { id: "#32876", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Suit",         status: "Collected",      statusType: "collected" },
  { id: "#11394", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male",   outfit: "Wedding gown", status: "Overdue 2 days", statusType: "overdue"   },
  { id: "#99822", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator",      status: "Due in 3 days",  statusType: "due"       },
  { id: "#11873", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male",   outfit: "Senator",      status: "Due in 3 days",  statusType: "due"       },
  { id: "#28374", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male",   outfit: "Wedding gown", status: "Collected",      statusType: "collected" },
  { id: "#28375", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Suit",         status: "Overdue 2 days", statusType: "overdue"   },
  { id: "#28376", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male",   outfit: "Senator",      status: "Due in 3 days",  statusType: "due"       },
];

const statusStyles: Record<ClientStatusType, { bg: string; color: string }> = {
  collected: { bg: "#E7F6EC", color: "#036B26" },
  overdue:   { bg: "#FBEAE9", color: "#9E0A05" },
  due:       { bg: "#FEF6E7", color: "#865503" },
};

function AddIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path opacity="0.4" d="M12.1425 1.5H5.8575C3.1275 1.5 1.5 3.1275 1.5 5.8575V12.135C1.5 14.8725 3.1275 16.5 5.8575 16.5H12.135C14.865 16.5 16.4925 14.8725 16.4925 12.1425V5.8575C16.5 3.1275 14.8725 1.5 12.1425 1.5Z" fill="white"/>
      <path d="M13.5 8.4375H9.5625V4.5C9.5625 4.1925 9.3075 3.9375 9 3.9375C8.6925 3.9375 8.4375 4.1925 8.4375 4.5V8.4375H4.5C4.1925 8.4375 3.9375 8.6925 3.9375 9C3.9375 9.3075 4.1925 9.5625 4.5 9.5625H8.4375V13.5C8.4375 13.8075 8.6925 14.0625 9 14.0625C9.3075 14.0625 9.5625 13.8075 9.5625 13.5V9.5625H13.5C13.8075 9.5625 14.0625 9.3075 14.0625 9C14.0625 8.6925 13.8075 8.4375 13.5 8.4375Z" fill="white"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z" stroke="#667185" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3.33331 4.99984C3.33331 4.5396 3.70641 4.1665 4.16665 4.1665H15.8333C16.2936 4.1665 16.6666 4.5396 16.6666 4.99984C16.6666 5.46007 16.2936 5.83317 15.8333 5.83317H4.16665C3.70641 5.83317 3.33331 5.46007 3.33331 4.99984Z" fill="#344054"/>
      <path d="M4.99998 9.99984C4.99998 9.5396 5.37308 9.1665 5.83331 9.1665H14.1666C14.6269 9.1665 15 9.5396 15 9.99984C15 10.4601 14.6269 10.8332 14.1666 10.8332H5.83331C5.37308 10.8332 4.99998 10.4601 4.99998 9.99984Z" fill="#344054"/>
      <path d="M7.49998 14.1665C7.03974 14.1665 6.66665 14.5396 6.66665 14.9998C6.66665 15.4601 7.03974 15.8332 7.49998 15.8332H12.5C12.9602 15.8332 13.3333 15.4601 13.3333 14.9998C13.3333 14.5396 12.9602 14.1665 12.5 14.1665H7.49998Z" fill="#344054"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66663 0.833496C7.12686 0.833496 7.49996 1.20659 7.49996 1.66683V2.50016H12.5V1.66683C12.5 1.20659 12.8731 0.833496 13.3333 0.833496C13.7935 0.833496 14.1666 1.20659 14.1666 1.66683V2.50016H15C16.8409 2.50016 18.3333 3.99255 18.3333 5.8335V15.0002C18.3333 16.8411 16.8409 18.3335 15 18.3335H4.99996C3.15901 18.3335 1.66663 16.8411 1.66663 15.0002V5.8335C1.66663 3.99255 3.15901 2.50016 4.99996 2.50016H5.83329V1.66683C5.83329 1.20659 6.20639 0.833496 6.66663 0.833496ZM12.5 4.16683C12.5 4.62707 12.8731 5.00016 13.3333 5.00016C13.7935 5.00016 14.1666 4.62707 14.1666 4.16683H15C15.9204 4.16683 16.6666 4.91302 16.6666 5.8335V6.25016H3.33329V5.8335C3.33329 4.91302 4.07948 4.16683 4.99996 4.16683H5.83329C5.83329 4.62707 6.20639 5.00016 6.66663 5.00016C7.12686 5.00016 7.49996 4.62707 7.49996 4.16683H12.5ZM16.6666 7.91683H3.33329V15.0002C3.33329 15.9206 4.07948 16.6668 4.99996 16.6668H15C15.9204 16.6668 16.6666 15.9206 16.6666 15.0002V7.91683Z" fill="#344054"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#667185" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 20L9 12L15 4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 4L15 12L9 20" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6.5 3.5H9.1L10.2 7.3L8.4 8.4C9.2 10.4 10.6 11.8 12.6 12.6L13.7 10.8L17.5 11.9V14.5C17.5 15 17.1 15.4 16.6 15.4C10.9 15.9 6.1 11.1 6.6 5.4C6.6 4.9 7 4.5 7.5 4.5H6.5V3.5Z" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

function ClientMobileCard({ client, onEdit, onDelete }: { client: Client; onEdit: () => void; onDelete: () => void }) {
  const st = statusStyles[client.statusType];
  return (
    <article className="tailora-client-card">
      <div className="tailora-client-card-main">
        <div className="tailora-client-card-avatar" aria-hidden>{getInitials(client.name)}</div>
        <div className="tailora-client-card-body">
          <div className="tailora-client-card-head">
            <div className="tailora-client-card-name-wrap">
              <h3 className="tailora-client-card-name">{client.name}</h3>
              <span className="tailora-client-card-id">{client.id}</span>
            </div>
            <span className="tailora-client-card-status" style={{ background: st.bg, color: st.color }}>{client.status}</span>
          </div>
          <div className="tailora-client-card-phone"><PhoneIcon /><span>{client.phone}</span></div>
          <div className="tailora-client-card-tags">
            <span className="tailora-client-card-tag">{client.gender}</span>
            <span className="tailora-client-card-tag tailora-client-card-tag--outfit">{client.outfit}</span>
          </div>
        </div>
      </div>
      <ActionMenuButton
        onEdit={onEdit}
        onDelete={onDelete}
        label={`Actions for ${client.name}`}
      />
    </article>
  );
}

export default function ClientManagementPage() {
  const { openAddClient } = useAppModals();
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [currentPage, setCurrentPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const totalPages = 30;
  const pageNumbers = [1, 2, 3, 4, 10, 11, 12];

  const filteredClients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.gender.toLowerCase().includes(q) ||
      c.outfit.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  }, [searchQuery, clients]);

  const handleEdit = (client: Client) => {
    // TODO: wire to your edit flow
    alert(`Edit ${client.name} (${client.id})`);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setClients(prev => prev.filter(c => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
      <AppPageHeader title="Client Management" />
      <AppPageBody>
        <PageSectionHeader
          title={
            <span className="tailora-clients-title-row">
              Client
              <img src="/sewingmachine.svg" alt="" className="tailora-clients-title-icon" width={32} height={32} />
            </span>
          }
          subtitle="Check out the most recent list of clients."
          action={
            <PrimaryButton className="tailora-clients-add-btn" onClick={() => openAddClient()}>
              <AddIcon />
              Add Client
            </PrimaryButton>
          }
        />

        <div className="tailora-data-panel tailora-clients-card" style={{ background: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: 10, boxShadow: "0px 4px 4px -2px rgba(0,0,0,0.04)", overflow: "hidden", maxWidth: "100%" }}>
          <div className="tailora-table-toolbar tailora-clients-toolbar">
            <label className="tailora-table-search tailora-clients-search">
              <SearchIcon />
              <input
                type="search"
                className="tailora-clients-search-input"
                placeholder="Search here..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search clients"
              />
            </label>
            <div className="tailora-clients-toolbar-actions">
              <button type="button" className="tailora-table-filter-btn tailora-clients-filter-btn">
                <FilterIcon />
                Filter
              </button>
              <button type="button" className="tailora-clients-date-btn">
                <CalendarIcon />
                <span className="tailora-clients-date-label">Select dates</span>
                <ChevronDownIcon />
              </button>
            </div>
          </div>

          <p className="tailora-clients-results-count" aria-live="polite">
            {filteredClients.length} {filteredClients.length === 1 ? "client" : "clients"}
            {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ""}
          </p>

          {/* Mobile cards */}
          <div className="tailora-m-cards tailora-clients-cards-mobile">
            {filteredClients.length === 0 ? (
              <div className="tailora-clients-empty">
                <p className="tailora-clients-empty-title">No clients found</p>
                <p className="tailora-clients-empty-text">Try a different search or add a new client.</p>
                <PrimaryButton className="tailora-clients-empty-btn" onClick={() => openAddClient()}>
                  <AddIcon />
                  Add Client
                </PrimaryButton>
              </div>
            ) : (
              filteredClients.map(c => (
                <ClientMobileCard
                  key={c.id}
                  client={c}
                  onEdit={() => handleEdit(c)}
                  onDelete={() => setDeleteTarget(c)}
                />
              ))
            )}
          </div>

          {/* Desktop table */}
          <div className="tailora-data-table-desktop tailora-table-scroll tailora-clients-table-desktop">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F8F8" }}>
                  {["ID", "Client Name", "Phone Number", "Gender", "Outfit Type", "Status", ""].map((h, i) => (
                    <th key={h || "actions"} style={{ padding: "12px 24px", textAlign: i === 6 ? "center" : "left", fontSize: 12, fontWeight: 500, color: "#344054", borderBottom: "1px solid #E4E7EC", whiteSpace: "nowrap", fontFamily: i === 0 ? "Inter, sans-serif" : "Satoshi, var(--font-satoshi), sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(c => {
                  const st = statusStyles[c.statusType];
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Inter, sans-serif" }}>{c.id}</td>
                      <td style={{ padding: "16px 24px" }}><span style={{ fontSize: 14, fontWeight: 500, color: "#101928", fontFamily: "var(--font-satoshi)" }}>{c.name}</span></td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Inter, sans-serif" }}>{c.phone}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "var(--font-satoshi)" }}>{c.gender}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "var(--font-satoshi)" }}>{c.outfit}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ display: "inline-block", padding: "0 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, lineHeight: "17px", background: st.bg, color: st.color, fontFamily: "var(--font-satoshi)" }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <ActionMenuButton
                            onEdit={() => handleEdit(c)}
                            onDelete={() => setDeleteTarget(c)}
                            label={`Actions for ${c.name}`}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="tailora-pagination tailora-clients-pagination">
            <span className="tailora-pagination-indicator">Page {currentPage} of {totalPages}</span>
            <div className="tailora-pagination-pages" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {pageNumbers.map((p, i) => {
                if (p === 4 && pageNumbers[i - 1] !== 3) return null;
                const isEllipsis = i === 3;
                if (isEllipsis) return <span key="ellipsis" style={{ width: 24, textAlign: "center", color: "#98A2B3", fontSize: 14 }}>...</span>;
                return (
                  <button key={p} type="button" onClick={() => setCurrentPage(p)} style={{ width: 24, height: 24, borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14, background: currentPage === p ? "#FFECE5" : "#FFFFFF", color: currentPage === p ? "#EB5017" : "#98A2B3", fontFamily: "Inter, sans-serif" }}>
                    {p}
                  </button>
                );
              })}
            </div>
            <div className="tailora-pagination-nav">
              <button type="button" className="tailora-pagination-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                <ChevronLeftIcon /><span className="tailora-pagination-btn-label">Previous</span>
              </button>
              <button type="button" className="tailora-pagination-btn" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                <span className="tailora-pagination-btn-label">Next</span><ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </AppPageBody>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.id})` : undefined}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}