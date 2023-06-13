import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BaseButton, BaseButtonProps } from './component';

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
};
export default meta;

const buttonProps: BaseButtonProps = {
  type: 'button',
  children: 'label',
  onClick: action('onClick'),
};

const linkProps: BaseButtonProps = {
  type: 'link',
  href: '#',
  children: 'label',
};

type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {
  args: {
    ...buttonProps,
  },
};

export const Link: Story = {
  args: {
    ...linkProps,
  },
};
