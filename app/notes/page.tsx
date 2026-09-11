"use client";

import AppShell from "../../components/AppShell";
import NotesWidget from "../../components/NotesWidget";
import AppPageHeader from "../../components/AppPageHeader";
import { AppPageBody, PageSectionHeader } from "../../components/AppPageBody";

export default function NotesPage() {
  return (
    <AppShell activeItem="Notes">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <AppPageHeader title="Notes & Scratchpad" />
        <AppPageBody>
          <PageSectionHeader
            title="Tailora Notes"
            subtitle="Take notes on client fittings, fabric preferences, special order instructions, and general ideas."
          />
          <NotesWidget />
        </AppPageBody>
      </div>
    </AppShell>
  );
}
