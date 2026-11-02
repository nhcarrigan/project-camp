"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui";

/**
 * Tabs navigation showcase section.
 *
 * Where used:
 * - Rendered in the component demonstration list on the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Demonstrates tabbed navigation using `@repo/ui` `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.
 * - Allows switching between HTML, CSS, and JavaScript panel views.
 */
export function TabsShowcase() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">5. Tabs Navigation</h2>
      <Tabs defaultValue="html">
        <TabsList>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        <TabsContent value="html">
          <div className="p-4 border border-t-0 border-foreground-secondary">
            <h4 className="font-bold mb-1">HTML Structure</h4>
            <p className="text-sm">
              Semantic elements defining the content of your web page.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="css">
          <div className="p-4 border border-t-0 border-foreground-secondary">
            <h4 className="font-bold mb-1">CSS Stylesheet</h4>
            <p className="text-sm">
              freeCodeCamp base styles and responsive styling rules.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="js">
          <div className="p-4 border border-t-0 border-foreground-secondary">
            <h4 className="font-bold mb-1">JavaScript Logic</h4>
            <p className="text-sm">
              Interactive components and client-side application state.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
