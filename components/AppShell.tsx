"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AddClientModal, { type ClientFormData } from "./AddClientModal";
import { AppModalsContext } from "./AppModalsContext";
import ClientMeasurementsModal from "./ClientMeasurementsModal";
import InviteTeamMemberModal from "./InviteTeamMemberModal";
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
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingClient, setPendingClient] = useState<ClientFormData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleContinue = (data: ClientFormData) => {
    setPendingClient(data);
    setShowAddClient(false);
    setShowMeasurements(true);
  };

  const handleMeasurementsSave = () => {
    setShowMeasurements(false);
    setPendingClient(null);
    setShowSuccess(true);
  };

  const closeMeasurements = () => {
    setShowMeasurements(false);
    setPendingClient(null);
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
          {children}
        </div>
      </div>

      <AddClientModal
        isOpen={showAddClient}
        onClose={closeAddClient}
        onSaveDraft={closeAddClient}
        onContinue={handleContinue}
      />
      <ClientMeasurementsModal
        isOpen={showMeasurements}
        client={pendingClient}
        onClose={closeMeasurements}
        onSave={handleMeasurementsSave}
      />
      <InviteTeamMemberModal isOpen={showInvite} onClose={closeInvite} />
      <SuccessModal isOpen={showSuccess} onAction={() => setShowSuccess(false)} />
    </AppModalsContext.Provider>
  );
}
