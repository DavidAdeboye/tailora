"use client";

import AppShell from "../../components/AppShell";
import AnalyticsPage from "../../components/AnalyticsPage";

export default function AnalyticsRoute() {
  return (
    <AppShell activeItem="Analytics">
      <AnalyticsPage />
    </AppShell>
  );
}
