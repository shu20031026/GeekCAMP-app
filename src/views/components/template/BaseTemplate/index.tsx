import { FC, ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};
export const BaseTemplate: FC<Props> = (props) => {
  const { children } = props;
  const style = ' p-8 bg-green-100';

  return <div className={style}>{children}</div>;
};
