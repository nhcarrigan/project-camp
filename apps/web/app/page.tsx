import React from "react";
import {
  HeroBanner,
  ButtonShowcase,
  AlertShowcase,
  ModalShowcase,
  FormShowcase,
  TabsShowcase,
} from "./components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-5xl mx-auto space-y-10">
      <HeroBanner />
      <ButtonShowcase />
      <AlertShowcase />
      <ModalShowcase />
      <FormShowcase />
      <TabsShowcase />
    </div>
  );
}
