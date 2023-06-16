import { forwardRef } from 'react';
import BaseButton from '../../base/BaseButton';
import { BaseButtonProps } from '../../base/BaseButton/component';

export const CopyOrPasteButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ ...rest }, forwardRef): JSX.Element => {
    return (
      <BaseButton
        {...rest}
        className='border-[2px] border-gray-200 bg-gray-100 w-fit p-[4px] shadow-md'
        ref={forwardRef}
      />
    );
  },
);

CopyOrPasteButton.displayName = 'CopyOrPasteButton';
