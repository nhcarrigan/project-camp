import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormControl, FormGroup, ControlLabel, HelpBlock } from "./form";

const meta: Meta = {
  title: "Components/Form",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-4">
      <FormGroup>
        <ControlLabel htmlFor="username">Username</ControlLabel>
        <FormControl
          id="username"
          placeholder="Enter your username"
          type="text"
        />
        <HelpBlock>Your username must be unique.</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabel htmlFor="email">Email address</ControlLabel>
        <FormControl
          id="email"
          placeholder="name@example.com"
          type="email"
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel htmlFor="bio">Bio</ControlLabel>
        <FormControl
          id="bio"
          componentClass="textarea"
          rows={3}
          placeholder="Tell us about yourself"
        />
      </FormGroup>
    </div>
  ),
};
