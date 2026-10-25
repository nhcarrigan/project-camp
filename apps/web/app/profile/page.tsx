import React from "react";
import { ProfileHeader, ProfileForm } from "../components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-3xl mx-auto space-y-8">
      <ProfileHeader />
      <ProfileForm />
    </div>
  );
}
