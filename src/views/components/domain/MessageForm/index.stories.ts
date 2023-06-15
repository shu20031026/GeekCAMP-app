import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MessageForm from '.';

const meta: Meta<typeof MessageForm> = {
  component: MessageForm,
};

export default meta;
type Story = StoryObj<typeof MessageForm>;

export const Default: Story = {
  args: {
    placeholder: 'placeholder',
    onChange: action('onChange'),
  },
};

export const InDefaultValue: Story = {
  args: {
    placeholder: 'placeholder',
    onChange: action('onChange'),
    defaultValue: 'hoge',
  },
};
