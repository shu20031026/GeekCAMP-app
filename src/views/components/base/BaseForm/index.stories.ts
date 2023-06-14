import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BaseForm from '.';

const meta: Meta<typeof BaseForm> = {
  component: BaseForm,
};

export default meta;
type Story = StoryObj<typeof BaseForm>;

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
