import { FC } from 'react';
import BaseForm from '../../base/BaseForm';
import { BaseFormProps } from '../../base/BaseForm/component';

export type Props = BaseFormProps;

export const MessageForm: FC<Props> = (props) => {
  const style = 'border-2 border-gray-300';
  return <BaseForm {...props} className={style} />;
};
