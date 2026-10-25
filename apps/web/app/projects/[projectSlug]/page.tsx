"use client";

import React, { use } from "react";
import {
  ProjectDetailHeader,
  ProjectStatusNotice,
  ProjectOverviewCards,
} from "../../components/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectSlug } = use(params);
  const decodedSlug = decodeURIComponent(projectSlug);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-4xl mx-auto space-y-8">
      <ProjectDetailHeader
        projectSlug={projectSlug}
        decodedSlug={decodedSlug}
      />
      <ProjectStatusNotice decodedSlug={decodedSlug} />
      <ProjectOverviewCards />
    </div>
  );
}
