import type { StoryFn, Meta } from '@storybook/react';
import SSG, { Props } from '.';

const meta: Meta<typeof SSG> = {
  component: SSG,
};

export default meta;

const defaultProps: Props = {
  formattedDate: 'April 22, 2023 at 10:27:46 PM GMT+9',
};

const Template: StoryFn<typeof SSG> = (args) => {
  return <SSG {...defaultProps} {...args} />;
};

export const Default = Template.bind({});
