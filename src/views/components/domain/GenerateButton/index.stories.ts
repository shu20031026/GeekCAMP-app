import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GenerateButton from '.';

const meta: Meta<typeof GenerateButton> = {
  component: GenerateButton,
};
export default meta;

type Story = StoryObj<typeof GenerateButton>;

export const Default: Story = {
  args: {
    type: 'button',
    children: 'label',
    onClick: action('onClick'),
  },
};
