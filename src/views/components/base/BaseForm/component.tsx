import clsx from 'clsx';
import { FC } from 'react';

const baseStyle = `w-full h-full min-h-7 p-0`;

export type BaseFormProps = {
  id?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'number';
};

export const BaseForm: FC<BaseFormProps> = (props) => {
  const { id, value, defaultValue, placeholder, disabled, onChange, className, type = 'text' } = props;
  const style = clsx(baseStyle, className);
  return (
    <input
      type={type}
      id={id}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={style}
    />
  );
};
