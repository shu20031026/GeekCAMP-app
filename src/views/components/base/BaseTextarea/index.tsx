import { ComponentProps, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

export const BaseTextarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(
  ({ className, ...rest }, forwardRef): JSX.Element => {
    return (
      <textarea
        ref={forwardRef}
        className={tv({ base: 'flex items-center justify-center w-full h-full min-h-7 p-0 border-2 border-gray-300' })({
          className: className,
        })}
        {...rest}
      />
    );
  },
);

BaseTextarea.displayName = 'BaseTextarea';
