import * as Popover from '@radix-ui/react-popover';
import { ReactNode, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  popupMessage: string;
};

export const PopupButton = ({ children, popupMessage }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();

  const handlePopover = (value: boolean) => {
    clearTimeout(timeoutIdRef.current);
    setIsOpen(value);
    timeoutIdRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={handlePopover}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className='w-fit bg-white shadow-md' sideOffset={5}>
          <div className='p-[8px] border-[2px] border-gray-200'>{popupMessage}</div>
          <Popover.Arrow className='fill-gray-200' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
