import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const CircleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 24 24'}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
