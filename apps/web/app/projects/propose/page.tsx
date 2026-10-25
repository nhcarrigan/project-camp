import React from "react";
import {
  ProposeProjectHeader,
  ProposeProjectForm,
} from "../../components/projects";

export default function ProposeProjectPage() {
  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-3xl mx-auto space-y-8">
      <ProposeProjectHeader />
      <ProposeProjectForm />
    </div>
  );
}
