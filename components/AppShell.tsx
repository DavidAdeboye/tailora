"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import { resolveWorkspace } from "../lib/resolveWorkspace";
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
  const activeMenu = PATH_TO_MENU[pathname] ?? "Dashboard";

  const [showAddClient, setShowAddClient] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showOrderFlow, setShowOrderFlow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [pendingClient, setPendingClient] =
    useState<ClientFormData | null>(null);

  const [pendingEditingOrderId, setPendingEditingOrderId] =
    useState<string | undefined>(undefined);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAddClient = () => {
    setPendingClient(null);
    setShowAddClient(true);
  };

  const openInviteCoworker = () => {
    setShowInvite(true);
  };

  const closeAddClient = () => {
    setShowAddClient(false);
  };

  const closeInvite = () => {
    setShowInvite(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openOrderFlowForClient = (
    clientData: ClientFormData,
    editingOrderId?: string
  ) => {
    setPendingClient(clientData);
    setPendingEditingOrderId(editingOrderId);
    setShowOrderFlow(true);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleContinueFromModal = (data: ClientFormData) => {
    setPendingClient(data);
    setPendingEditingOrderId(undefined);
    setShowAddClient(false);
    setShowOrderFlow(true);
  };

  const handleSaveClientDraft = async (data: ClientFormData) => {
    try {
      const identity = await resolveWorkspace();

      if (!identity) return;

      const ownerId = identity.workspaceOwnerId;

      await supabase.from("profiles").upsert(
        {
          id: identity.userId,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
          ignoreDuplicates: true,
        }
      );

      await supabase.from("clients").insert({
        user_id: ownerId,
        name: data.name.trim(),
        phone: data.phone.trim() || "",
        email: data.email.trim() || "",
        gender: data.gender || "",
        outfit_type: data.outfitType || "",
        status: "Pending",
      });

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("tailora_client_updated"));
      }
    } catch (err) {
      console.error("Failed to save client draft:", err);
    } finally {
      closeAddClient();
      setPendingClient(null);
    }
  };

  const handleBackToModal = () => {
    setShowOrderFlow(false);
    setShowAddClient(true);
  };

  const handleSaveDraft = () => {
    setShowOrderFlow(false);
    setPendingClient(null);
    setPendingEditingOrderId(undefined);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("tailora_client_updated"));
    }
  };

  const handleOrderFlowComplete = () => {
    setShowOrderFlow(false);
    setPendingClient(null);
    setPendingEditingOrderId(undefined);
    setShowSuccess(true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("tailora_client_updated"));
    }
  };

  return (
    <AppModalsContext.Provider
      value={{
        openAddClient,
        openInviteCoworker,
        toggleMobileMenu,
        closeMobileMenu,
        openOrderFlowForClient,
      }}
    >
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
            className="tailora-sidebar-overlay tailora-sidebar-overlay--visible"
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

        <div
          className="tailora-app-main"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <div
            className="tailora-route-enter"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minWidth: 0,
              width: "100%",
            }}
          >
            {showOrderFlow && pendingClient ? (
              <OrderCreationFlow
                client={pendingClient}
                editingOrderId={pendingEditingOrderId}
                onBack={handleBackToModal}
                onSaveDraft={handleSaveDraft}
                onComplete={handleOrderFlowComplete}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>

      <AddClientModal
        isOpen={showAddClient}
        onClose={closeAddClient}
        onSaveDraft={handleSaveClientDraft}
        onContinue={handleContinueFromModal}
        initialData={pendingClient}
      />

      <InviteTeamMemberModal
        isOpen={showInvite}
        onClose={closeInvite}
      />

      <SuccessModal
        isOpen={showSuccess}
        onAction={() => setShowSuccess(false)}
      />
    </AppModalsContext.Provider>
  );
}