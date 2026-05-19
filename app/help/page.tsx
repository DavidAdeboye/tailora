"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

/* ── Icons ── */
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
    <path opacity="0.4" d="M22.1 17.69C21.8 18.5 21.16 19.12 20.32 19.4C19.15 19.79 17.95 20.08 16.74 20.29L16.38 20.34C16.18 20.38 15.99 20.4 15.8 20.42C15.56 20.45 15.31 20.47 15.06 20.5C14.38 20.55 13.7 20.58 13.02 20.58C12.33 20.58 11.64 20.55 10.95 20.49C10.66 20.46 10.38 20.43 10.1 20.39C9.93 20.37 9.77 20.34 9.62 20.32C9.5 20.3 9.38 20.29 9.26 20.27C8.06 20.07 6.87 19.78 5.71 19.39C4.84 19.1 4.18 18.48 3.89 17.69C3.6 16.91 3.71 16 4.17 15.22L5.4 13.18C5.65 12.74 5.89 11.88 5.89 11.36V9.35C5.89 5.42 9.08 2.22 13.02 2.22C16.94 2.22 20.14 5.42 20.14 9.35V11.36C20.14 11.88 20.38 12.74 20.65 13.18L21.87 15.22C22.32 15.98 22.4 16.87 22.1 17.69Z" fill="#121212"/>
    <path d="M13 11.66C12.55 11.66 12.18 11.29 12.18 10.83V7.48C12.18 7.02 12.55 6.65 13 6.65C13.46 6.65 13.82 7.02 13.82 7.48V10.83C13.82 11.29 13.44 11.66 13 11.66Z" fill="#121212"/>
    <path d="M16.07 21.68C15.61 22.93 14.41 23.83 13 23.83C12.14 23.83 11.3 23.49 10.7 22.87C10.36 22.54 10.1 22.11 9.94 21.67C10.09 21.69 10.23 21.7 10.38 21.72C10.63 21.75 10.89 21.79 11.15 21.81C11.77 21.86 12.4 21.89 13.02 21.89C13.64 21.89 14.26 21.86 14.86 21.81C15.09 21.79 15.32 21.77 15.54 21.74C15.71 21.72 15.88 21.7 16.07 21.68Z" fill="#121212"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path opacity="0.4" d="M15.48 13.23L11.69 8.18H6.08C5.12 8.18 4.64 9.34 5.32 10.02L10.5 15.2C11.33 16.03 12.68 16.03 13.51 15.2L15.48 13.23Z" fill="#121212"/>
    <path d="M17.92 8.18H11.69L15.48 13.23L18.69 10.02C19.36 9.34 18.88 8.18 17.92 8.18Z" fill="#121212"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9.17" cy="9.17" r="6.17" stroke="#667185" strokeWidth="1.67"/>
    <path d="M15 15L13 13" stroke="#667185" strokeWidth="1.67" strokeLinecap="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 12.5L10 7.5L5 12.5" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Header ── */
function AppHeader() {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #F0F2F5", height: 83, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", flexShrink: 0 }}>
      <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#28292D" }}>Help & Support</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 1px rgba(78,78,78,0.16)" }}>
          <BellIcon />
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}>
          <img src="/Ellipse2481.png" alt="" style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #F2F2F6" }} />
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  );
}

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    question: "How do I add a new client?",
    answer: "To add a new client, click the 'Add Client' button in the sidebar or on the dashboard. Fill in the client's name, phone number, email, gender, and outfit type, then click Continue to proceed to measurements.",
  },
  {
    question: "How do I record measurements for a client?",
    answer: "After adding a client, you'll be taken to the measurements page. Enter the body measurements for the client in the provided fields. You can switch between inches and centimetres, and also add custom measurement fields as needed.",
  },
  {
    question: "How do I invite a team member?",
    answer: "Click 'Invite Co-worker' in the sidebar Actions section, or use the 'Invite Member' button in the Team Collaboration page. Enter the team member's name, email address, and select their role (Admin, Tailor, or Assistant), then send the invitation.",
  },
  {
    question: "How do I track order status?",
    answer: "Order statuses are visible on the dashboard's Recent Orders table and on the Client Management page. Each order shows one of three statuses: Collected (green), Due in X days (yellow), or Overdue (red) so you can prioritise your work at a glance.",
  },
  {
    question: "How do I update my profile information?",
    answer: "Navigate to Settings using the sidebar, then go to the Profile tab. You can update your full name, business name, email address, and physical address. Click 'Save Changes' when done.",
  },
  {
    question: "How do I change my password?",
    answer: "Go to Settings → Security tab. Click on 'Change password' to be guided through the password update process. You'll need to verify your identity before setting a new password.",
  },
  {
    question: "Can I set custom delivery deadlines?",
    answer: "Yes. In Settings → Workspace, you can configure default turnaround times for Standard orders and Express orders. These defaults will pre-fill when creating new orders so you don't have to enter them every time.",
  },
  {
    question: "How do I enable two-factor authentication?",
    answer: "Go to Settings → Security and toggle on 'Two-Factor Authentication (2FA)'. Follow the on-screen prompts to link your authenticator app or phone number for an added layer of account security.",
  },
];

const CONTACT_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path opacity="0.4" d="M19.83 3.5H8.17C5.25 3.5 2.92 5.83 2.92 8.75V18.08C2.92 21 5.25 23.33 8.17 23.33H19.83C22.75 23.33 25.08 21 25.08 18.08V8.75C25.08 5.83 22.75 3.5 19.83 3.5Z" fill="#121212"/>
        <path d="M14 14.93C12.6 14.93 11.18 14.49 10.09 13.59L6.76 10.84C6.38 10.53 6.32 9.97 6.63 9.58C6.94 9.2 7.5 9.14 7.89 9.45L11.22 12.2C12.73 13.43 15.26 13.43 16.77 12.2L20.1 9.45C20.49 9.14 21.06 9.19 21.36 9.58C21.67 9.97 21.62 10.54 21.23 10.84L17.9 13.59C16.82 14.49 15.4 14.93 14 14.93Z" fill="#121212"/>
      </svg>
    ),
    label: "Email Us",
    value: "support@tailora.co",
    action: "mailto:support@tailora.co",
    actionLabel: "Send email →",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path opacity="0.4" d="M13.42 2.33C7.57 2.33 2.83 7.07 2.83 12.92C2.83 14.79 3.32 16.56 4.17 18.09L2.92 24.5L9.5 23.27C10.99 24.06 12.66 24.5 14.42 24.5C20.27 24.5 25.01 19.76 25.01 13.91C25.01 11.07 23.88 8.42 21.9 6.44C19.91 4.46 17.26 2.33 13.42 2.33Z" fill="#121212"/>
        <path d="M19.95 17.5C19.71 18.24 18.68 18.85 17.86 19.03C17.31 19.15 16.59 19.24 14.14 18.24C10.99 16.97 8.96 13.76 8.8 13.55C8.65 13.34 7.58 11.91 7.58 10.43C7.58 8.95 8.33 8.23 8.63 7.92C8.88 7.66 9.29 7.54 9.68 7.54C9.81 7.54 9.93 7.55 10.04 7.56C10.34 7.57 10.49 7.59 10.69 8.08L11.49 10.07C11.69 10.57 11.74 10.67 11.74 10.88C11.74 11.09 11.62 11.33 11.49 11.52C11.37 11.71 11.22 11.85 11.07 12.04C10.92 12.2 10.76 12.38 10.93 12.68C11.1 12.97 11.69 13.93 12.56 14.7C13.68 15.7 14.6 16.03 14.93 16.17C15.18 16.27 15.47 16.25 15.65 16.06C15.88 15.81 16.17 15.4 16.46 14.99C16.67 14.7 16.93 14.66 17.21 14.76C17.49 14.85 19.47 15.84 19.77 15.99C20.07 16.14 20.27 16.21 20.34 16.34C20.41 16.47 20.19 17.26 19.95 17.5Z" fill="white"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "+234 800 TAILORA",
    action: "https://wa.me/234800824567",
    actionLabel: "Chat on WhatsApp →",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path opacity="0.4" d="M25.08 9.33V18.67C25.08 21.58 22.75 23.92 19.83 23.92H8.17C5.25 23.92 2.92 21.58 2.92 18.67V9.33C2.92 6.42 5.25 4.08 8.17 4.08H19.83C22.75 4.08 25.08 6.42 25.08 9.33Z" fill="#121212"/>
        <path d="M14 15.17C13.32 15.17 12.63 14.95 12.07 14.5L8.17 11.33C7.78 11.02 7.72 10.45 8.03 10.07C8.34 9.68 8.9 9.62 9.29 9.93L13.19 13.1C13.64 13.46 14.37 13.46 14.82 13.1L18.72 9.93C19.11 9.62 19.68 9.68 19.98 10.07C20.29 10.46 20.23 11.02 19.84 11.33L15.94 14.5C15.37 14.95 14.68 15.17 14 15.17Z" fill="white"/>
      </svg>
    ),
    label: "Live Chat",
    value: "Available Mon–Fri, 9am–6pm WAT",
    action: "#",
    actionLabel: "Start a chat →",
  },
];

/* ── Accordion FAQ Item ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #F1F1F2" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>{question}</span>
        <span style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(180deg)" }}>
          <ChevronUpIcon />
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, fontSize: 14, fontWeight: 400, color: "#555960", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

/* ── Main Help Page ── */
export default function HelpPage() {
  const [activeMenu, setActiveMenu] = useState("Help & Support");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredFaq = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FDFDFD", fontFamily: "Satoshi, Inter, sans-serif", overflow: "hidden" }}>
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AppHeader />

        <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD", position: "relative" }}>
          {/* Gradient strip */}
          <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />

          <div style={{ padding: "40px 36px 60px", position: "relative" }}>

            {/* Page heading */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8 }}>
                Hi, Joshua's Couture
                <span style={{ fontSize: 26 }}>🧵</span>
              </h1>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
                How can we help?
              </p>
            </div>

            {/* Search bar */}
            <div style={{ marginBottom: 48, maxWidth: 420 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", border: `1px solid ${searchFocused ? "#121212" : "#D0D5DD"}`, borderRadius: 6, background: "#fff", boxShadow: "0 4px 8px -2px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)", transition: "border-color 0.15s" }}>
                <SearchIcon />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search here..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#1A1A1A", fontFamily: "Satoshi, sans-serif", background: "transparent" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#98A2B3", display: "flex", alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                )}
              </div>
            </div>

            {/* Contact cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48, maxWidth: 900 }}>
              {CONTACT_CARDS.map((card, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #F1F1F2", borderRadius: 12, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#FDF6EC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", fontFamily: "Satoshi, sans-serif", marginBottom: 4 }}>{card.label}</div>
                    <div style={{ fontSize: 13, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>{card.value}</div>
                  </div>
                  <a
                    href={card.action}
                    style={{ fontSize: 13, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {card.actionLabel}
                  </a>
                </div>
              ))}
            </div>

            {/* FAQ section */}
            <div style={{ maxWidth: 760 }}>
              <h2 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 20, color: "#121212" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
                Quick answers to common questions about using Tailora.
              </p>

              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F1F2", padding: "0 24px" }}>
                {filteredFaq.length > 0 ? (
                  filteredFaq.map((item, i) => (
                    <FaqItem key={i} question={item.question} answer={item.answer} />
                  ))
                ) : (
                  <div style={{ padding: "32px 0", textAlign: "center", color: "#98A2B3", fontSize: 14, fontFamily: "Satoshi, sans-serif" }}>
                    No results found for "{search}"
                  </div>
                )}
              </div>
            </div>

            {/* Still need help banner */}
            <div style={{ maxWidth: 760, marginTop: 32, background: "#121212", borderRadius: 12, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: "#E7E7E7", marginBottom: 6 }}>Still need help?</div>
                <div style={{ fontSize: 13, color: "#B6B6B6", fontFamily: "Satoshi, sans-serif" }}>Our support team is ready to assist you directly.</div>
              </div>
              <a
                href="mailto:support@tailora.co"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#FDF6EC", borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe9cc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FDF6EC")}
              >
                Contact Support
                <ChevronRightIcon />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}