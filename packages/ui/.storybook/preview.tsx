import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="light-palette p-6 font-sans text-foreground-primary bg-background-primary min-h-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
