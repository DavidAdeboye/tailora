"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import AddClientModal, { type ClientFormData } from "./AddClientModal";
import { AppModalsContext } from "./AppModalsContext";
import InviteTeamMemberModal from "./InviteTeamMemberModal";
import OrderCreationFlow from "./OrderCreationFlow";
import Sidebar from "./Sidebar";
import SuccessModal from "./SuccessModal";

const PATH_TO_MENU: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/clients": "Client Management",
  "/team": "Team Collaboration",
  "/settings": "Settings",
  "/help": "Help & Support",
};

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const activeMenu = PATH_TO_MENU[pathname] ?? "Dashboard";

  const [showAddClient, setShowAddClient] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showOrderFlow, setShowOrderFlow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingClient, setPendingClient] = useState<ClientFormData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const openAddClient = () => setShowAddClient(true);
  const openInviteCoworker = () => setShowInvite(true);
  const closeAddClient = () => setShowAddClient(false);
  const closeInvite = () => setShowInvite(false);
  const toggleMobileMenu = () => setMobileMenuOpen((o) => !o);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      const user = (data as any)?.user;
      if (!user) {
        router.replace("/login");
        return;
      }
      setIsCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="tailora-auth-check" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Checking authentication…</div>
      </div>
    );
  }

  // After client info is filled → open the full-page flow
  const handleContinueFromModal = (data: ClientFormData) => {
    setPendingClient(data);
    setShowAddClient(false);
    setShowOrderFlow(true);
  };

  // Save client draft from the modal directly to Supabase
  const handleSaveClientDraft = async (data: ClientFormData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;
      
      let ownerId = userData.user.id;
      const { data: rpcResult } = await supabase.rpc('get_my_team_role');
      if (rpcResult && rpcResult.length > 0) {
        ownerId = rpcResult[0].owner_id;
      }

      await supabase.from('clients').insert({
        user_id: ownerId,
        name: data.name,
        phone: data.phone || '',
        email: data.email || '',
        gender: data.gender || '',
        outfit_type: data.outfitType || '',
        status: 'Pending'
      });
    } catch (err) {
      console.error("Failed to save client draft:", err);
    } finally {
      closeAddClient();
    }
  };

  // "Back" from the flow → re-open the modal so user can edit client info
  const handleBackToModal = () => {
    setShowOrderFlow(false);
    setShowAddClient(true);
  };

  // Save draft from the flow
  const handleSaveDraft = () => {
    setShowOrderFlow(false);
    setPendingClient(null);
  };

  // Complete the flow → show success
  const handleOrderFlowComplete = () => {
    setShowOrderFlow(false);
    setPendingClient(null);
    setShowSuccess(true);
  };

  return (
    <AppModalsContext.Provider value={{ openAddClient, openInviteCoworker, toggleMobileMenu, closeMobileMenu }}>
      <div
        className="tailora-app-shell"
        style={{
          display: "flex",
          height: "100vh",
          background: "#FDFDFD",
          fontFamily: "'Satoshi', 'Inter', sans-serif",
          overflow: "hidden",
        }}
      >
        {mobileMenuOpen && (
          <button
            type="button"
            className={`tailora-sidebar-overlay${mobileMenuOpen ? " tailora-sidebar-overlay--visible" : ""}`}
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
        )}
        <Sidebar
          activeMenu={activeMenu}
          onAddClient={() => {
            openAddClient();
            closeMobileMenu();
          }}
          onInviteCoworker={() => {
            openInviteCoworker();
            closeMobileMenu();
          }}
          mobileOpen={mobileMenuOpen}
          onNavigate={closeMobileMenu}
          onCloseMobile={closeMobileMenu}
        />
        <div className="tailora-app-main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <div
            key={pathname}
            className="tailora-route-enter"
            style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: "100%" }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Step 1: Client info modal (small) */}
      <AddClientModal
        isOpen={showAddClient}
        onClose={closeAddClient}
        onSaveDraft={handleSaveClientDraft}
        onContinue={handleContinueFromModal}
      />

      {/* Steps 2 & 3: Full-page flow (measurements + order details) */}
      {showOrderFlow && pendingClient && (
        <OrderCreationFlow
          client={pendingClient}
          onBack={handleBackToModal}
          onSaveDraft={handleSaveDraft}
          onComplete={handleOrderFlowComplete}
        />
      )}

      <InviteTeamMemberModal isOpen={showInvite} onClose={closeInvite} />
      <SuccessModal isOpen={showSuccess} onAction={() => setShowSuccess(false)} />
    </AppModalsContext.Provider>
  );
}