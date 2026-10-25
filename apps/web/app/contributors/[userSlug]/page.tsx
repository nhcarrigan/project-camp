"use client";

import React, { use } from "react";
import {
  ContributorHeader,
  ContributorNotice,
  ContributorSkillsCard,
  ContributorContributionsCard,
} from "../../components/contributors";

type ContributorPageProps = {
  params: Promise<{
    userSlug: string;
  }>;
};

export default function ContributorPage({ params }: ContributorPageProps) {
  const { userSlug } = use(params);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-4xl mx-auto space-y-8">
      <ContributorHeader userSlug={userSlug} />
      <ContributorNotice userSlug={userSlug} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContributorSkillsCard />
        <ContributorContributionsCard />
      </div>
    </div>
  );
}
