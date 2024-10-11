import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const UpSlopeIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16H0C11.9 16 15.625 5.33333 16 0V16Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
