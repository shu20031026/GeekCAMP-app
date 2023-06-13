import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BaseLink from '.';

const meta: Meta<typeof BaseLink> = {
  component: BaseLink,
};

export default meta;
type Story = StoryObj<typeof BaseLink>;

export const Default: Story = {
  args: {
    href: 'http://localhost:3000',
    children: 'label',
  },
};

export const UnderLine: Story = {
  args: {
    href: 'http://localhost:3000',
    children: 'label',
    hoveredLine: true,
  },
};
