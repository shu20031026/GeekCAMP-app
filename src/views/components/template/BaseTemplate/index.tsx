import { FC, ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};
export const BaseTemplate: FC<Props> = (props) => {
  const { children } = props;
  const style = 'flex flex-1 w-full flex-col items-center justify-center text-center px-4';

  return <div className={style}>{children}</div>;
};
