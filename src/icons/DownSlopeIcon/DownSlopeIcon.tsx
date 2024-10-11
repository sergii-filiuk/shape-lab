import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const DownSlopeIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16V0C0 11.9 10.6667 15.625 16 16H0Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
