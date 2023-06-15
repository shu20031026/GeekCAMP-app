import { FC } from 'react';
import { BaseButton, BaseButtonProps } from '../../base/BaseButton/component';
export type Props = BaseButtonProps;

export const GenerateButton: FC<Props> = (props) => {
  const style = 'bg-blue-300 text-white w-fit px-[32px] font-bold text-[24px]';
  return <BaseButton {...props} className={style} />;
};