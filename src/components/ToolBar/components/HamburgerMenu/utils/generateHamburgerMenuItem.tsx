import { HamburgerMenuItem } from '../types';
import { CheckIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';

export const generateHamburgerMenuItem = (
  item: HamburgerMenuItem,
  isSelected: boolean
) => {
  return (
    <div
      className={clsx(
        'flex w-full px-2 text-xs',
        item.disabled && 'text-gray-500 pointer-events-none'
      )}
    >
      <div
        className={clsx(
          'flex w-full relative px-1 rounded items-center h-6',
          !item.disabled && 'hover:bg-gray-600 '
        )}
      >
        {item.isSelectable && isSelected && (
          <CheckIcon className={'absolute left-1  h-4 w-4'} />
        )}
        <div className={item.isSelectable ? 'pl-6' : ''}>{item.label}</div>
      </div>
    </div>
  );
};
