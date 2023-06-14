import { FC } from 'react';
import { BaseButton, BaseButtonProps } from '../../base/BaseButton/component';
export type Props = BaseButtonProps;

export const GenerateButton: FC<Props> = (props) => {
  const style = 'bg-blue-300 text-white';
  return <BaseButton {...props} className={style} />;
};
