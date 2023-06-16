import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FaCheck } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';

export type Mode = 'evaluate' | 'translate';

type Props = {
  currentMode: Mode;
  setCurrentMode: Dispatch<SetStateAction<Mode>>;
  modeList: Mode[];
  children?: ReactNode;
};

export const ModeSelect = ({ children, currentMode, setCurrentMode, modeList }: Props): JSX.Element => {
  return (
    <Listbox value={currentMode} onChange={setCurrentMode}>
      <Listbox.Button className='flex bg-red-400 text-white w-fit px-[32px] justify-center items-center'>
        <div className='font-bold text-[24px]'>{children}</div>
        <HiSelector className='w-[32px] h-[32px]' />
      </Listbox.Button>
      <Listbox.Options className='absolute w-fit bg-white m-[4px] p-[8px] rounded-[8px]'>
        {modeList.map((mode, idx) => (
          <Listbox.Option
            key={idx}
            value={mode}
            className={({ active }) =>
              clsx('cursor-pointer px-[8px]', active ? 'bg-red-100 text-red-900' : 'text-gray-900')
            }
          >
            {({ selected }) => (
              <div className='flex items-center justify-center'>
                {selected && <FaCheck />}
                <div className={selected ? 'font-medium' : 'font-normal'}>{mode}</div>
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
