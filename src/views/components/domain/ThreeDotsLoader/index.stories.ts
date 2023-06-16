import { Meta, StoryObj } from '@storybook/react';
import ThreeDotsLoader from '.';

const meta: Meta<typeof ThreeDotsLoader> = {
  component: ThreeDotsLoader,
};

export default meta;
type Story = StoryObj<typeof ThreeDotsLoader>;

export const Default: Story = {
  args: {},
};
