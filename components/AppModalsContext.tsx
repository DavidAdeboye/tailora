"use client";

import { createContext, useContext } from "react";

export type AppModalsContextValue = {
  openAddClient: () => void;
  openInviteCoworker: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openOrderFlowForClient?: (clientData: any) => void;
};

export const AppModalsContext = createContext<AppModalsContextValue | null>(null);

export function useAppModals(): AppModalsContextValue {
  const ctx = useContext(AppModalsContext);
  if (!ctx) {
    throw new Error("useAppModals must be used within AppShell");
  }
  return ctx;
}
