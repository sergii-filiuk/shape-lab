import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const PlusIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M12.667 8H3.333M8 12.666V3.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
