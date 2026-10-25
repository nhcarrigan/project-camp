import React from "react";
import {
  DashboardHeader,
  DashboardNotice,
  DashboardCards,
} from "../components/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-5xl mx-auto space-y-8">
      <DashboardHeader />
      <DashboardNotice />
      <DashboardCards />
    </div>
  );
}
