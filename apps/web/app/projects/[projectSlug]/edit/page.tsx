"use client";

import React, { use } from "react";
import {
  EditProjectHeader,
  EditProjectForm,
} from "../../../components/projects";

type EditProjectPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectSlug } = use(params);
  const decodedSlug = decodeURIComponent(projectSlug);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-3xl mx-auto space-y-8">
      <EditProjectHeader decodedSlug={decodedSlug} />
      <EditProjectForm projectSlug={projectSlug} decodedSlug={decodedSlug} />
    </div>
  );
}
