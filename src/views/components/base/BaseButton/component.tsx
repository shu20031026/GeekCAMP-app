import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import BaseLink from '../BaseLink';
export type ButtonType = 'submit' | 'reset' | 'button' | 'link';

const baseStyle = `flex items-center justify-center w-full h-full min-h-7 p-0`;

/** ボタン用 */
type AsButtonProps = {
  type: 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

/** リンク用*/
type AsLinkProps = {
  type: 'link';
  href?: string;
  hoveredLine?: boolean;
};

/** サブミットボタン用*/
type AsSubmitProps = {
  type: 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

export type BaseButtonProps = {
  id?: string;
  type: ButtonType;
  className?: string;
  children: ReactNode;
} & (AsButtonProps | AsLinkProps | AsSubmitProps);

export const BaseButton: FC<BaseButtonProps> = (props) => {
  const { id, children, className } = props;

  const style = clsx(baseStyle, className);

  if (props.type === 'link') {
    const { href, hoveredLine = false } = props;
    return (
      <BaseLink id={id} className={style} href={href} hoveredLine={hoveredLine}>
        {children}
      </BaseLink>
    );
  }

  return (
    <button id={id} onClick={props.onClick} className={style}>
      {children}
    </button>
  );
};
