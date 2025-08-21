import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
    asChild: { table: { disable: true } },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "default",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="destructive">
        Destructive
      </Badge>
    </div>
  ),
};

export const Blue: Story = {
  render: (args) => (
    <Badge
      {...args}
      className="bg-blue-500 text-white dark:bg-blue-600"
      variant="secondary"
    >
      Default
    </Badge>
  ),
};
