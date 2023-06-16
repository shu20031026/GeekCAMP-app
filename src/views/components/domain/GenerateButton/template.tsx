import { FC } from 'react';
import { BaseButton, BaseButtonProps } from '../../base/BaseButton/component';
export type Props = BaseButtonProps;

export const GenerateButton: FC<Props> = (props) => {
  return <BaseButton {...props} />;
};
