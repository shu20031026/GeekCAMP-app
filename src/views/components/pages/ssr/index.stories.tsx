import type { StoryFn, Meta } from '@storybook/react';
import SSR, { Props } from '.';

const meta: Meta<typeof SSR> = {
  component: SSR,
};

export default meta;

const defaultProps: Props = {
  formattedDate: 'April 22, 2023 at 10:27:46 PM GMT+9',
};

const Template: StoryFn<typeof SSR> = (args) => {
  return <SSR {...defaultProps} {...args} />;
};

export const Default = Template.bind({});
