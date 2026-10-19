import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <div
        className={`light-palette font-sans text-foreground-primary bg-background-primary min-h-screen ${context.parameters.layout === "fullscreen" ? "" : "p-6"}`}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
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
