import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "",
    disabled: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url", "tel"],
      description: "HTML input의 type 속성을 지정합니다.",
    },
    placeholder: {
      control: "text",
      description: "입력 필드에 표시되는 placeholder 텍스트입니다.",
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 입력 필드를 비활성화합니다.",
    },
    className: {
      table: { disable: true },
      description:
        "추가적인 Tailwind CSS 또는 사용자 정의 클래스를 전달합니다.",
    },
    "aria-invalid": {
      control: "boolean",
      description: "유효성 검증 실패 시 true로 설정하여 접근성을 향상시킵니다.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "AAPL",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화",
    disabled: true,
  },
};

export const Invalid: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <label className="text-sm text-red-600">오류가 있는 입력값</label>
      <Input {...args} aria-invalid />
      <p className="text-xs text-red-600">올바른 값을 입력하세요.</p>
    </div>
  ),
  args: {
    placeholder: "유효하지 않은 값",
  },
};

export const WithLabelAndHint: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <label className="text-sm font-medium">심볼 검색</label>
      <Input {...args} placeholder="예: AAPL, MSFT" />
      <p className="text-xs text-muted-foreground">
        티커 또는 종목명을 입력하세요.
      </p>
    </div>
  ),
};
