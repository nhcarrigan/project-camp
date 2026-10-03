import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 border border-t-0 border-foreground-secondary">
          <h4 className="font-bold">Account Settings</h4>
          <p className="text-sm mt-1">Manage your account preferences and profile details here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 border border-t-0 border-foreground-secondary">
          <h4 className="font-bold">Password Security</h4>
          <p className="text-sm mt-1">Change your password and configure two-factor authentication.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 border border-t-0 border-foreground-secondary">
          <h4 className="font-bold">System Preferences</h4>
          <p className="text-sm mt-1">Configure your editor layout and notifications.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
