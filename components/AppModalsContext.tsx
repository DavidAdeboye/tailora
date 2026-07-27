"use client";

import { createContext, useContext } from "react";

export type AppModalsContextValue = {
  openAddClient: () => void;
  openInviteCoworker: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  /** Opens the order creation/edit wizard.
   *  Pass editingOrderId to edit an existing order; omit for a new order. */
  openOrderFlowForClient?: (clientData: any, editingOrderId?: string) => void;
};

export const AppModalsContext = createContext<AppModalsContextValue | null>(null);

export function useAppModals(): AppModalsContextValue {
  const ctx = useContext(AppModalsContext);
  if (!ctx) {
    throw new Error("useAppModals must be used within AppShell");
  }
  return ctx;
}
