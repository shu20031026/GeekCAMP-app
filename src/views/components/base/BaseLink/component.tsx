import { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

export type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  hoveredLine?: boolean;
  children?: ReactNode;
  className?: string;
};

export const BaseLink: FC<BaseLinkProps> = ({ ...props }) => {
  const { href, target = '_self', hoveredLine = false, className, children } = props;
  const style = clsx(className, hoveredLine && 'hover:underline');

  return (
    <NextLink href={`${href}`} className={style} target={target} {...props}>
      {children}
    </NextLink>
  );
};
